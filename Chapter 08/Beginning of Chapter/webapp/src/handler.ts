import { IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";

export const basicHandler = (req: IncomingMessage, resp: ServerResponse) => {  
    resp.write(readFileSync("static/index.html"));
    resp.end();
};
