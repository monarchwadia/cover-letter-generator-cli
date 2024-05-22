import {RaggedHistoryItem } from "ragged"
import { buildRagged } from "./buildRagged"

export type PromptOpts = {
    model: "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo";
}

export const prompter = () => {
    const r = buildRagged();
    const prompt = async (input: RaggedHistoryItem[], opts: PromptOpts = { model: "gpt-3.5-turbo"}) => {
        return r.chat(input, {
            tools: [],
            requestOverrides: {
                model: opts.model
            }
        }).waitForFinish()
    }

    return {
        prompt
    }
}