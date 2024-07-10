import { openai } from '../init';

async function main() {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What’s in this image?' },
          {
            type: 'image_url',
            image_url: {
              url: 'https://images.pexels.com/photos/4792507/pexels-photo-4792507.jpeg?auto=compress&cs=tinysrgb&w=600',
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();
