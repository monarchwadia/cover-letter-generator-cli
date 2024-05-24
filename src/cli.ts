import { config } from "dotenv";
config();

import chalk from "chalk";

import { collectCommand } from "./utils/collectCommand";
import { v4 } from "uuid";
import { RaggedHistoryItem } from "ragged";
import { commandExecutor } from "./ai/CommandExecutor";
import { readResume } from "./utils/data";

const genDraft1 = commandExecutor('draft-1');
const getFocusSkills = commandExecutor('get-focus-skills');

function main() {
  collectCommand(async (jobDescription) => {
    const sessionId = v4();

    // read resume from '../.resume'
    const resume: string = readResume();

    type Context = {
      resume: string,
      jobDescription: string,
      focusSkills?: string,
    }
    let context: Context = { resume, jobDescription }

    // validate the command
    const focusSkills = await getFocusSkills.executeAndGetFirstText(sessionId, jobDescription.trim(), context);
    context = { ...context, focusSkills }

    const draft1 = await genDraft1.executeAndGetFirstText(sessionId, jobDescription.trim(), context);

    console.log(chalk.green("============================ Draft 1 ============================"))
    console.log(draft1);
    console.log(chalk.green("============================ Finished ============================"))
  })
}
// Start the application
main();
