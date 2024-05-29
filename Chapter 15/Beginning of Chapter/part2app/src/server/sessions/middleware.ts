import { Request, Response, NextFunction } from "express";
import { SessionRepository, Session } from "./repository";
//import { MemoryRepository } from "./memory_repository";
import { setCookie, getCookie } from "../cookies";
import { OrmRepository } from "./orm_repository";

const session_cookie_name = "custom_session";
const expiry_seconds = 300;

const getExpiryDate = () => new Date(Date.now() + (expiry_seconds * 1_000));

export const customSessionMiddleware = () => {
    //const repo: SessionRepository = new MemoryRepository();
    const repo: SessionRepository = new OrmRepository();

    return async (req: Request, resp: Response, next: NextFunction) => {
        
        const id = getCookie(req, session_cookie_name);
    
        const session = (id ? await repo.getSession(id) : undefined) 
                            ?? await repo.createSession();
        
        (req as any).session = session;

        setCookie(resp, session_cookie_name, session.id, { 
            maxAge: expiry_seconds * 1000
        })

        resp.once("finish", async () => {
            if ( Object.keys(session.data).length > 0) {
                if (req.method == "POST") {
                    await repo.saveSession(session, getExpiryDate());
                } else {
                    await repo.touchSession(session, getExpiryDate());
                }
            }
        })
        
        next();
    }
}
