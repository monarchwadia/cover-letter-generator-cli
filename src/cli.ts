import { config } from "dotenv";
config();

import { validateCommand } from "./prompts/validateCommand";
import { mutateState } from "./prompts/mutateState";
import { analyzeNewAbilities } from "./prompts/analyzeNewAbilities";
import { compileReports } from "./utils/compileReports";
import { collectCommand } from "./utils/collectCommand";



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
    collectCommand(async (line) => {
      const validationReport = await validateCommand(currentState, line.trim()) || "";
      const mutationReport = await mutateState(currentState, line.trim());
      currentState = mutationReport || currentState;
      const newAbilitiesReport = await analyzeNewAbilities(currentState);
      const finalReport = await compileReports(validationReport, mutationReport, newAbilitiesReport);
    
      console.log(finalReport);
    })
    
  }
}

async function processPlayerCommand(line: string) {

}

// Start the application
showSplashText();
