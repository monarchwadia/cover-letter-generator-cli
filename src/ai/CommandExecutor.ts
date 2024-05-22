import fs from 'fs';;
import { getPaths } from './utils';
import { logger } from './Logger';
import { PromptOpts, prompter } from './Prompter';
import { RaggedHistoryItem } from 'ragged';
import { promptTemplate } from './PromptTemplate';

export const commandExecutor = <T>(namespace: string) => {
    const { prompt: _prompt } = prompter();
    const { log } = logger(namespace);
    const { template } = promptTemplate<T>(namespace);

    const execute = async (sessionId: string, command: string, data: T, opts?: PromptOpts) => {
        const systemPrompt = template(data);

        // create the input object
        const input: RaggedHistoryItem[] = [
            {
                type: 'history.text',
                role: 'system',
                data: {
                    text: systemPrompt
                }
            },
            {
                type: 'history.text',
                role: 'human',
                data: {
                    text: command
                }
            }
        ]
        
        const output = await _prompt(input, opts);
        log({
            input,
            output,
            sessionId
        });

        return output;
    }

    const executeAndGetFirstText = async (sessionId: string, command: string, data: T, opts?: PromptOpts) => {
        const output = await execute(sessionId, command, data, opts);

        if (output.length === 0 || output[0].type !== 'history.text') {
            throw new Error('Critical error: No text output found!');
        }

        return output[0].data.text;
    }

    return {
        execute,
        executeAndGetFirstText
    }
}
