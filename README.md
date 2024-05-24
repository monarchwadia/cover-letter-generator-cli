# Cover letter generator

A text-only cover letter generator in the CLI.

## Setup

```sh
# enter your openai api key in .env
echo "OPENAI_CREDS=your-api-key" > .env

# install dependencies
pnpm install
```

## How to use

First, add a text-only version of your resume in `.resume`. In most cases, it's OK if you just copy-paste without formatting.

Then, to start the CLI, run...

```sh
pnpm dev 
```

Then, paste the job description in the console.

Wait a few seconds. It will output your cover letter.

## Modifying the prompt

The prompt is tuned for me, but it can be tuned specifically for you, too. Look for the `prompt.hbs` files. First, it calls `get-focus-skills` and then pumps the output into `draft-1`.

## Adding more prompts in the chain

You can add more prompts in the chain. The `CommandExecutor` object generates a new prompt folder by convention with handlebars files.

```ts
// initialize the command executor. In this case, "draft-1" is the namespace we have given it. It will create a prompt folder in src/prompts/draft-1.
const genDraft1 = commandExecutor('draft-1');

// and then run the actual prompt
const draft1 = await genDraft1.executeAndGetFirstText(sessionId, jobDescription.trim(), context);
```

Look at `cli.ts` for more details on how to use it.