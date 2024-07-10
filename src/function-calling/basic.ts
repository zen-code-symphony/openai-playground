// Example dummy function hard coded to return the same weather
import { ChatCompletionMessageParam } from 'openai/src/resources/index.js';

import { openai } from '../init';

// In production, this could be your backend API or an external API
function getCurrentWeather(location: string, unit = 'fahrenheit') {
  if (location.toLowerCase().includes('tokyo')) {
    return JSON.stringify({
      location: 'Tokyo',
      temperature: '10',
      unit: 'celsius',
    });
  } else if (location.toLowerCase().includes('san francisco')) {
    return JSON.stringify({
      location: 'San Francisco',
      temperature: '72',
      unit: 'fahrenheit',
    });
  } else if (location.toLowerCase().includes('paris')) {
    return JSON.stringify({
      location: 'Paris',
      temperature: '22',
      unit: 'fahrenheit',
    });
  } else {
    return JSON.stringify({ location, temperature: 'unknown' });
  }
}

async function runConversation() {
  // Step 1: send the conversation and available functions to the model
  const messages = [
    {
      role: 'user',
      content: "What's the weather like in San Francisco, Tokyo, and Paris?",
    } as ChatCompletionMessageParam,
  ];
  const tools = [
    {
      type: 'function' as const,
      function: {
        name: 'get_current_weather',
        description: 'Get the current weather in a given location',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'The city and state, e.g. San Francisco, CA',
            },
            unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
          },
          required: ['location'],
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: messages,
    tools: tools,
    tool_choice: 'auto', // auto is default, but we'll be explicit
  });
  const responseMessage = response.choices[0].message;

  // Step 2: check if the model wanted to call a function
  const toolCalls = responseMessage.tool_calls;
  if (responseMessage.tool_calls) {
    // Step 3: call the function
    // Note: the JSON response may not always be valid; be sure to handle errors
    const availableFunctions: { [key: string]: (...args: any[]) => string } = {
      get_current_weather: getCurrentWeather,
    }; // only one function in this example, but you can have multiple
    messages.push(responseMessage); // extend conversation with assistant's reply
    for (const toolCall of toolCalls!) {
      const functionName = toolCall.function.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = functionToCall(
        functionArgs.location,
        functionArgs.unit,
      );
      messages.push({
        tool_call_id: toolCall.id,
        role: 'tool',
        content: functionResponse,
      }); // extend conversation with function response
    }
    console.log(JSON.stringify(messages, null, 2));
    const secondResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
    }); // get a new response from the model where it can see the function response
    return secondResponse.choices;
  }
}

runConversation().then(console.log).catch(console.error);
