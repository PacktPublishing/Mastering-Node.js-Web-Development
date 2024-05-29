import { readFileSync } from "fs";
import { getEnvironment, Env } from "./environment";
import { merge } from "./merge";
import { config as dotenvconfig } from "dotenv";

dotenvconfig({ path: "overrides.env", override: false});

const file = process.env.SERVER_CONFIG ?? "server.config.json"
const data = JSON.parse(readFileSync(file).toString());

dotenvconfig({
    path: getEnvironment().toString() + ".env"
})

try {
    const envFile = getEnvironment().toString() + "." + file;
    const envData = JSON.parse(readFileSync(envFile).toString());
    merge(data, envData);
} catch {
    // do nothing - file doesn't exist or isn't readable
}

export const getConfig = (path: string, defaultVal: any = undefined) => {
    const paths = path.split(":");
    let val = data;
    paths.forEach(p => val = val[p]);
    return val ?? defaultVal;
}

export const getSecret = (name: string) => {
    const secret = process.env[name];
    if (secret === undefined) {
        throw new Error(`Undefined secret: ${name}`);
    }
    return secret;
} 

export { getEnvironment, Env };
