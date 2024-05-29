import express, { Express } from "express";

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}))
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", (req, resp) => {
        resp.render("age");
    });

    app.post("/form", (req, resp) => {
        const nextage = Number.parseInt(req.body.age) 
            + Number.parseInt(req.body.years);
        const context = { 
            ...req.body, nextage
        };
        resp.render("age", context);   
    });
}
