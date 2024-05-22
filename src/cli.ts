import { config } from "dotenv";
config();

import { collectCommand } from "./utils/collectCommand";
import { v4 } from "uuid";
import { RaggedHistoryItem } from "ragged";
import { commandExecutor } from "./ai/CommandExecutor";

const mutateState = commandExecutor('mutate-state');
const validateCommand = commandExecutor('validate-command');
const evolveWorld = commandExecutor('evolve-world');
const reportChanges = commandExecutor('report-changes');


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
        oldState: string,
        validationReport?: string,
        newState?: string
      }
      let context: Context = {
        oldState: state,
        validationReport: undefined,
        newState: undefined 
      }

      // validate the command
      context.validationReport = await validateCommand.executeAndGetFirstText(sessionId, line.trim(), context);

      // change the world
      context.newState = await mutateState.executeAndGetFirstText(sessionId, line.trim(), context);

      // print a report on the changes
      const report = await reportChanges.executeAndGetFirstText(sessionId, line.trim(), context);

      // update state
      state = context.newState;

      console.log("=====================================");
      console.log("REPORT: ", report);
      console.log("STATE: ", state);




      console.log("The void awaits your next command.");
    })
    
  }
}
// Start the application
showSplashText();
