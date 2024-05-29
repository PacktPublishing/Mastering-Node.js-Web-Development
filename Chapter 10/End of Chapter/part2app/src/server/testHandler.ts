import { Request, Response } from "express";

export const testHandler = async (req: Request, resp: Response) => {    
    resp.setHeader("Content-Type", "application/json")
    resp.json(req.body);
    resp.end();        
}
