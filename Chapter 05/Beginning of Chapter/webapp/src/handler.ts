import { IncomingMessage, ServerResponse } from "http";
import { endPromise, writePromise } from "./promises";
//import { Count } from "./counter_cb";
import { Count } from "./count_promise";

const total = 2_000_000_000;
const iterations = 15;
let shared_counter = 0;

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const request = shared_counter++;

    try {
        await Count(request, iterations, total);
        const msg = `Request: ${request}, Iterations: ${(iterations)}`;        
        await writePromise.bind(res)(msg + "\n");                   
        await endPromise.bind(res)("Done");        
    } catch (err: any) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
};
