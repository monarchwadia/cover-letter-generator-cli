import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

export const getSourceRoot = () => path.join(__dirname, '../', 'prompts');

export const getPaths = (namespace: string) => {
    // get root folder
    const promptPath = path.join(getSourceRoot(), namespace, 'prompt.hbs');
    const logPath = path.join(getSourceRoot(), namespace, '.logfile');

    return {
        promptPath,
        logPath
    }
}

export const isoTimestamp = () => new Date().toISOString();