import { r } from "../r"

export async function mutateState(state, command) {
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
  
    return newStateDescription;
  }