import { config } from "dotenv";
config();

import { Ragged } from "ragged";
import readline from "readline";

const r = new Ragged({
    provider: "openai",
    config: {
        apiKey: process.env.VITE_OPENAI_CREDS
    }
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

const splashText = [
  '"In the beginning was the Word, and the Word was with God, and the Word was God.',
  'He was with God in the beginning.',
  'Through him all things were made; without him nothing was made that has been made."',
  '',
  '*A mysterious flash of lightning occurs*',
  '"There is nothing. Not even darkness."'
];

let currentState = "Void, nothing exists yet.";

function showSplashText(index = 0) {
  if (index < splashText.length) {
    console.log(splashText[index]);
    setTimeout(() => showSplashText(index + 1), 100);
  } else {
    console.log("\nWelcome, Creator. The void awaits your commands.\n");
    rl.prompt();
    rl.on('line', async (line) => {
      const validationReport = await validateCommand(currentState, line.trim()) || "";
      if (!validationReport.includes("valid")) { // Assuming the validation text indicates validity clearly
        console.log(validationReport);
        rl.prompt();
        return;
      }
    
      const mutationReport = await mutateState(currentState, line.trim());
      const newAbilitiesReport = await analyzeNewAbilities(currentState);
      const finalReport = await compileReports(validationReport, mutationReport, newAbilitiesReport);
    
      console.log(finalReport);
      rl.prompt();
    }).on('close', () => {
      console.log('Goodbye, Creator!');
      process.exit(0);
    });
    
  }
}

async function processPlayerCommand(playerInput) {
  const validationReport = await validateCommand(currentState, playerInput);

  const mutationReport = mutateState(currentState, playerInput);
  const newAbilitiesReport = analyzeNewAbilities(mutationReport);

  return compileReports(validationReport, mutationReport, newAbilitiesReport);
}

async function validateCommand(state, command) {
  const prompt = `
    The universe is currently in this state: ${state}

    Validate the command: ${command}
  `
  const response = r.chat([
    {
      type: "history.text",
      role: "system",
      data: {
        text: prompt
      }
    },
    {
      type: "history.text",
      role: "human",
      data: {
        text: command
      }
    }
  ]);

  const validationReport = await response.firstText();

  // Mock validation
  return validationReport;
}

async function mutateState(state, command) {
  const prompt = `
      Current state of the universe: ${state}
      Execute the command to change the state: ${command}
  `;
  const response = await r.chat([
      {
          type: "history.text",
          role: "system",
          data: {
              text: prompt
          }
      },
      {
          type: "history.text",
          role: "human",
          data: {
              text: command
          }
      }
  ]);

  const newStateDescription = await response.firstText();
  currentState = newStateDescription || currentState; // Update the global state based on text description

  return newStateDescription;
}


async function analyzeNewAbilities(state) {
  const prompt = `
      Analyze the new state for unlocked abilities: ${state}
  `;
  const response = await r.chat([
      {
          type: "history.text",
          role: "system",
          data: {
              text: prompt
          }
      }
  ]);

  const abilitiesReport = await response.firstText();
  return abilitiesReport;
}


async function compileReports(validation, mutation, abilities) {
  const finalReport = `
      Validation Result: ${validation}
      Mutation Effect: ${mutation}
      New Abilities Unlocked: ${abilities}
  `;

  return finalReport.trim();
}

// Start the application
showSplashText();
