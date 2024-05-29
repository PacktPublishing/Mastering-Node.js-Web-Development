import express, { Express } from "express";
import repository  from "./data";
import cookieMiddleware from "cookie-parser";
import { sessionMiddleware } from "./sessions/session_helpers";
import { Result } from "./data/repository";

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}))
    app.use(cookieMiddleware("mysecret"));
    app.use(sessionMiddleware());
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", async (req, resp) => {
        resp.render("data", {data: await repository.getAllResults(rowLimit)});
    });

    app.post("/form/delete/:id", async (req, resp) => {
        const id = Number.parseInt(req.params["id"]);
        await repository.delete(id);
        resp.redirect("/form");
        resp.end();
    });
        
    app.post("/form/add", async (req, resp) => {
        const nextage = Number.parseInt(req.body["age"]) 
            + Number.parseInt(req.body["years"]);

        await repository.saveResult({...req.body, nextage } as Result);
        resp.redirect("/form");
        resp.end();
    });
}
