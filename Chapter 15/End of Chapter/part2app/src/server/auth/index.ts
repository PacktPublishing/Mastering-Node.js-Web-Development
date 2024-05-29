import { Express, NextFunction, RequestHandler } from "express"
import { AuthStore } from "./auth_types";
import { OrmAuthStore } from "./orm_authstore";
import jwt from "jsonwebtoken";
import { HookContext } from "@feathersjs/feathers";
import passport from "passport";
import { configurePassport } from "./passport_config";

const jwt_secret = "mytokensecret";

const store: AuthStore = new OrmAuthStore();

//type User = { username: string }

declare module "express-session" {
    interface SessionData { username: string; }
}

declare global {
    module Express {
        //interface Request { user: User, authenticated: boolean }
        interface Request { authenticated: boolean }
        interface User {
            username: string
        }
    }
}

export const createAuth = (app: Express) => {

    configurePassport({ store, jwt_secret });

    app.get("/signin", (req, resp) => {
        const data = { 
            // username: req.query["username"],
            // password: req.query["password"],
            failed: req.query["failed"] ? true : false,
            signinpage: true
        }
        resp.render("signin", data);
    });

    app.post("/signin", passport.authenticate("local", {
        failureRedirect: `/signin?failed=1`,
        successRedirect: "/"
    }));

    app.use(passport.authenticate("session"), (req, resp, next) => {
        resp.locals.user = req.user;
        resp.locals.authenticated 
            = req.authenticated = req.user !== undefined;            
        next();
    });

    app.post("/api/signin", async (req, resp) => {
        const username = req.body.username;
        const password = req.body.password;
        const result: any = { 
            success: await store.validateCredentials(username, password)
        }
        if (result.success) {
            result.token = jwt.sign({username} , jwt_secret, 
                { expiresIn: "1hr"});
        } 
        resp.json(result);
        resp.end();    
    });

    app.post("/signout", async (req, resp) => {
        req.session.destroy(() => {
            resp.redirect("/");
        })
    });

    app.get("/unauthorized", async (req, resp) => {
        resp.render("unauthorized");
    });
}

export const roleGuard = (role: string) 
        : RequestHandler<Request, Response, NextFunction> => { 
    return async (req, resp, next) => {
        if (req.authenticated) {
            const username = req.user?.username;
            if (username != undefined 
                    && await store.validateMembership(username, role)) {
                next();
                return;
            }
            resp.redirect("/unauthorized");
        } else {
            resp.redirect("/signin");            
        }
    }
}

export const roleHook = (role: string) => {
    return async (ctx: HookContext) => {
        if (!ctx.params.authenticated) {
            ctx.http = { status: 401 };
            ctx.result = {};
        } else if (!(await store.validateMembership(
                ctx.params.user.username, role))) {
            ctx.http = { status: 403 };
            ctx.result = {};
        }
    }
}
