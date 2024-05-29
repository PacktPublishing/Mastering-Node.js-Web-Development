import { readFileSync } from "fs";

export const style = (stylesheet: string) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
}

export const partial = (file: string, context: any) => {
    const path = `./${context.settings.views}/${file}.custom`;
    return readFileSync(path, "utf-8");
}

export const conditional = (expression: string, 
        trueFile: string, falseFile: string, context: any, 
        evalFunc: (expr: string) => any) => {
    return partial(evalFunc(expression) ? trueFile : falseFile, context);
}
