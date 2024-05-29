import express, { Express } from "express";
import { getValidationResults, validate } from "./validation";

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({extended: true}))
}

export const registerFormRoutes = (app: Express) => {

    app.get("/form", (req, resp) => {
        resp.render("age", { helpers: { pass }});
    });

    app.post("/form", 
            validate("name").required().minLength(5),
            validate("age").isInteger(),
        (req, resp) => {
            const validation = getValidationResults(req);
            const context = { ...req.body, validation, 
                helpers: { pass }
            };
            if (validation.valid) {
                context.nextage = Number.parseInt(req.body.age) + 1;
            }
            resp.render("age", context);   
        });
}

const pass = (valid: any, propname: string, test: string ) => {
    let propResult = valid?.results?.[propname];
    return `display:${!propResult || propResult[test] ? "none" : "block" }`;
}
