"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSessionMiddleware = void 0;
//import { MemoryRepository } from "./memory_repository";
const cookies_1 = require("../cookies");
const orm_repository_1 = require("./orm_repository");
const session_cookie_name = "custom_session";
const expiry_seconds = 300;
const getExpiryDate = () => new Date(Date.now() + (expiry_seconds * 1000));
const customSessionMiddleware = () => {
    //const repo: SessionRepository = new MemoryRepository();
    const repo = new orm_repository_1.OrmRepository();
    return async (req, resp, next) => {
        const id = (0, cookies_1.getCookie)(req, session_cookie_name);
        const session = (id ? await repo.getSession(id) : undefined)
            ?? await repo.createSession();
        req.session = session;
        (0, cookies_1.setCookie)(resp, session_cookie_name, session.id, {
            maxAge: expiry_seconds * 1000
        });
        resp.once("finish", async () => {
            if (Object.keys(session.data).length > 0) {
                if (req.method == "POST") {
                    await repo.saveSession(session, getExpiryDate());
                }
                else {
                    await repo.touchSession(session, getExpiryDate());
                }
            }
        });
        next();
    };
};
exports.customSessionMiddleware = customSessionMiddleware;
