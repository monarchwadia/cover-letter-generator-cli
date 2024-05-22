import { commandExecutor } from "../ai/CommandExecutor";

export const validateCommand = commandExecutor<void>('validate-command');

// import { r } from "../r";

// export async function validateCommand(state, command) {
//   const prompt = `
//     The universe is currently in this state: ${state}

//     Validate the command: ${command}
//   `
//   const response = r.chat([
//     {
//       type: "history.text",
//       role: "system",
//       data: {
//         text: prompt
//       }
//     },
//     {
//       type: "history.text",
//       role: "human",
//       data: {
//         text: command
//       }
//     }
//   ]);

//   const validationReport = await response.firstText();

//   // Mock validation
//   return validationReport;
// }