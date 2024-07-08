import { idForTracking, openai } from './init';

async function main() {
  console.log(`id for tracking: ${idForTracking}`);
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
    user: idForTracking,
  });

  console.log(completion.choices[0]);
}

main();
