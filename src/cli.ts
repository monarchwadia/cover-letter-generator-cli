import { config } from "dotenv";
config();

import { validateCommand } from "./prompts/validateCommand";
import { mutateState } from "./prompts/mutateState";
import { analyzeNewAbilities } from "./prompts/analyzeNewAbilities";
import { compileReports } from "./utils/compileReports";
import { collectCommand } from "./utils/collectCommand";
import { v4 } from "uuid";
import { RaggedHistoryItem } from "ragged";
import { updateState } from "./prompts/updateState";
import { reportChanges } from "./prompts/summarizeChanges";


const splashText = [
  '"In the beginning was the Word, and the Word was with God, and the Word was God.',
  'He was with God in the beginning.',
  'Through him all things were made; without him nothing was made that has been made."',
  '',
  '*A mysterious flash of lightning occurs*',
  '"There is nothing. Not even darkness."'
];

let state = "Void, nothing exists yet.";

function showSplashText(index = 0) {
  if (index < splashText.length) {
    console.log(splashText[index]);
    setTimeout(() => showSplashText(index + 1), 100);
  } else {
    console.log("\nWelcome, Creator. The void awaits your commands.\n");
    collectCommand(async (line) => {
      const sessionId = v4();

      type Context = {
        state: string,
        validationReport: RaggedHistoryItem[],
        mutationReport: RaggedHistoryItem[],
        newAbilitiesReport: RaggedHistoryItem[]
      }
      let context: Context = {
        state: state,
        validationReport: [],
        mutationReport: [],
        newAbilitiesReport: []
      }
      context.validationReport = await validateCommand.execute(sessionId, line.trim());
      context.mutationReport = await mutateState.execute(sessionId, line.trim(), context);
      context.newAbilitiesReport = await analyzeNewAbilities.execute(sessionId, line.trim(), context);

      const result = await updateState.execute(sessionId, line.trim(), context);
      if (result[0].type !== "history.text") {
        console.log("Something went wrong. Please try again.");
        return;
      }

      const oldState = state;
      const newState = (result[0].data.text);

      // update state
      state = newState;

      // print a report on the changes
      const report = await reportChanges.execute(sessionId, line.trim(), {oldState, newState});
      if (report[0].type !== "history.text") {
        console.log("Something went wrong. Please try again.");
        return;
      }

      console.log(report[0].data.text);

      console.log("=====================================");
      console.log(state);
      console.log("=====================================");
      console.log("The void awaits your next command.");
    })
    
  }
}

async function processPlayerCommand(line: string) {

}

// Start the application
showSplashText();
