import express, { Express } from "express";
import repository  from "./data";
import { getJsonCookie, setJsonCookie } from "./cookies";
import cookieMiddleware from "cookie-parser";
import { customSessionMiddleware } from "./sessions/middleware";
import { getSession, sessionMiddleware } from "./sessions/session_helpers";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}))
    app.use(cookieMiddleware("mysecret"));
    //app.use(customSessionMiddleware());
    app.use(sessionMiddleware());
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await repository.getAllResults(rowLimit),
            personalHistory: getSession(req).personalHistory
        });
    });

    app.post("/form", async (req, resp) => {
        const nextage = Number.parseInt(req.body.age) 
            + Number.parseInt(req.body.years);

        await repository.saveResult({...req.body, nextage });

        req.session.personalHistory = [{
            id: 0, name: req.body.name, age: req.body.age,
            years: req.body.years, nextage}, 
            ...(req.session.personalHistory || [])].splice(0, 5);
        
        const context = { 
            ...req.body, nextage, 
            history: await repository.getAllResults(rowLimit),
            personalHistory: req.session.personalHistory
        };
        resp.render("age", context);   
    });
}
