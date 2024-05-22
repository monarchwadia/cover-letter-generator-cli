import { config } from "dotenv";
config();
import { Ragged } from "ragged";

export const r = new Ragged({
    provider: "openai",
    config: {
        apiKey: process.env.OPENAI_CREDS
    }
});
