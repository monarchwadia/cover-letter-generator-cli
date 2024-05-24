import readline from 'readline';
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

const prompt = () => {
  process.stdout.write(chalk.green("Copy/paste the job description below. If prompted, paste 'as a single line' to avoid formatting issues.\r\n"), () => {
    rl.prompt();
  });
}

export const collectCommand = (onCmd: (line: string) => Promise<void>) => {
    prompt()
    rl.on('line', async (line) => {
      await onCmd(line);
      prompt()
    }).on('close', () => {
      console.log('Goodbye!');
      process.exit(0);
    });
}