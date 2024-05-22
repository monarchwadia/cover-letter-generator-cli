import { config } from "dotenv";
import { Ragged } from "ragged";
config();

export const buildRagged = () => {
    const r = new Ragged({
        provider: "openai",
        config: {
            apiKey: process.env.OPENAI_CREDS
        }
    })

    return r;
}

