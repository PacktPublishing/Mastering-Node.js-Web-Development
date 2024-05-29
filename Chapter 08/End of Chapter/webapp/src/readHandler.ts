import { Request, Response } from "express";
import { readFile } from "fs/promises";

export const readHandler = async (req: Request, resp: Response) => {    
    try {
        resp.setHeader("Content-Type", "application/json")
        resp.write(await readFile("data.json"));
        debugger
    } catch (err) {
        resp.writeHead(500);
    }
    resp.end();
}
