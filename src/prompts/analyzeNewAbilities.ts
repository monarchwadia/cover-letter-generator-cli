import { r } from "../r";

export async function analyzeNewAbilities(state) {
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