import Handlebars from "handlebars";
import { getPaths } from "./utils";
import fs from "fs";

export const promptTemplate = <T>(namespace: string) => {

    const template = (data: T) => {
        const templatePath = getPaths(namespace).promptPath;
        if (!fs.existsSync(templatePath)) {
            const folder = templatePath.split('/').slice(0, -1).join('/');
            fs.mkdirSync(folder, { recursive: true });
            fs.writeFileSync(templatePath, '');
            console.log(`New prompt namespace ${namespace} detected. Created new empty prompt file at ${templatePath}`);
        }

        // read the prompt file
        const rawTemplate = fs.readFileSync(templatePath, 'utf8');
        const template = Handlebars.compile(rawTemplate);
        const result = template(data);

        return result;
    }

    return { template }
}