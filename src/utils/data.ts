import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const readResume = () => {
    return fs.readFileSync(path.join(__dirname, '../../.resume'), 'utf8')
}