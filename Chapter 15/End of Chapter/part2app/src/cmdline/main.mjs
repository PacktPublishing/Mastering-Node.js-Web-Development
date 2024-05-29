import { select } from "@inquirer/prompts";
import { ops } from "./operations.mjs";

(async function run() {
    let loop = true;
    while (loop) {
        const selection = await select({
            message: "Select an operation",
            choices: [...Object.keys(ops).map(k => {return { value: k }})]
        });
        await ops[selection]();
    }
})();
