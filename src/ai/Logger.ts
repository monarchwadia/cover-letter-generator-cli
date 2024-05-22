import { getPaths, isoTimestamp } from "./utils"
import { Mutex } from "async-mutex"
import fs from 'fs';
import { RaggedHistoryItem } from "ragged";

type LogParams = {
    sessionId: string; // uuid
    input: RaggedHistoryItem[];
    output: RaggedHistoryItem[];
}

export const logger = (namespace: string) => {
    const logPath = getPaths(namespace).logPath;

    // mutex
    const mutex = new Mutex();

    // functions
    
    const log = async (params: LogParams) => {
        const {input, output, sessionId} = params;
        const timestamp = isoTimestamp();

        await mutex.runExclusive(async () => {
            // ensure logfile
            if (!fs.existsSync(logPath)) {
                fs.writeFileSync(logPath, '[]');
            }

            // read log file
            const log = fs.readFileSync(logPath, 'utf8');
            const logArray = JSON.parse(log);

            logArray.push({
                sessionId,
                input,
                output,
                timestamp
            });

            // write log
            fs.writeFileSync(logPath, JSON.stringify(logArray));
        });
    }

    return {
        log
    }
}