import { openai } from '../init';

async function main() {
  const moderation = await openai.moderations.create({
    input: 'some, potentially, harmful content',
  });
  console.log(JSON.stringify(moderation, null, 2));
}

main();
