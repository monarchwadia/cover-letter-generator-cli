import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
  });

export const collectCommand = (onCmd: (line: string) => Promise<void>) => {
    rl.prompt();
    rl.on('line', async (line) => {
      await onCmd(line);
      rl.prompt();
    }).on('close', () => {
      console.log('Goodbye, Creator!');
      process.exit(0);
    });
}