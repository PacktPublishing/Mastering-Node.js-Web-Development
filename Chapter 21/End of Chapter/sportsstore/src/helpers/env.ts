import { Env, getEnvironment } from "../config";

export const isDevelopment = (value: any) => {
    console.log(">>>>> " + getEnvironment() === Env.Development);
    return getEnvironment() === Env.Development
}
