import { Request, Response } from "express";

export const readHandler = (req: Request, resp: Response) => {    
    resp.json({
        message: "Hello, World"
    });
}
