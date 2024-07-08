# openai-playground

## Install software

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/package-manager/current). See [.nvmrc](./.nvmrc) for version.
- [nvm - _optional_](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
- [VS Code - _optional_](https://code.visualstudio.com/download)

## Get up and running

1. Create `.env` file in root directory with required environment variables. Refer [.env-template](./.env-template) as reference.

2. Use the NodeJS version as per [.nvmrc](./.nvmrc). Note: Skip this in case you
   you are not using `nvm`.

   ```sh
   nvm use
   ```

3. Install dependencies.

   ```sh
   npm i
   ```

4. Test if OpenAI API key is configured. You should see a JSON response from
   OpenAI text generation model `gpt-3.5-turbo`.
   ```sh
   npm run openaitest
   ```
