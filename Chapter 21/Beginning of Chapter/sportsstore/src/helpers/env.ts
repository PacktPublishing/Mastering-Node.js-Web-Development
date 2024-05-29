import { Env, getEnvironment } from "../config";

export const isDevelopment = (value: any) => {
    return getEnvironment() === Env.Development
}
