import { Request } from "express";
//import { Session } from "./repository";
import session, { SessionData } from "express-session";
import sessionStore from "connect-session-sequelize";
import { Sequelize } from "sequelize";
import { Result } from "../data/repository";

export const getSession = (req: Request): SessionData => (req as any).session;

// declare global {
//     module Express {
//         interface Request {
//             session: Session
//         }
//     }
// }

declare module "express-session" {
    interface SessionData {
       personalHistory: Result[];
    }
}

export const sessionMiddleware = () => {

    const sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "pkg_sessions.db"
    });

    const store = new (sessionStore(session.Store))({
        db: sequelize
    });

    store.sync();

    return session({
        secret: "mysecret",
        store: store,
        cookie: { maxAge: 300 * 1000, sameSite: "strict" },
        resave: false, saveUninitialized: false
    })
}
