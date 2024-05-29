"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleHook = exports.roleGuard = exports.createAuth = void 0;
const orm_authstore_1 = require("./orm_authstore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./passport_config");
const jwt_secret = "mytokensecret";
const store = new orm_authstore_1.OrmAuthStore();
const createAuth = (app) => {
    (0, passport_config_1.configurePassport)({ store, jwt_secret });
    app.get("/signin", (req, resp) => {
        const data = {
            // username: req.query["username"],
            // password: req.query["password"],
            failed: req.query["failed"] ? true : false,
            signinpage: true
        };
        resp.render("signin", data);
    });
    app.post("/signin", passport_1.default.authenticate("local", {
        failureRedirect: `/signin?failed=1`,
        successRedirect: "/"
    }));
    app.use(passport_1.default.authenticate("session"), (req, resp, next) => {
        resp.locals.user = req.user;
        resp.locals.authenticated
            = req.authenticated = req.user !== undefined;
        next();
    });
    app.post("/api/signin", async (req, resp) => {
        const username = req.body.username;
        const password = req.body.password;
        const result = {
            success: await store.validateCredentials(username, password)
        };
        if (result.success) {
            result.token = jsonwebtoken_1.default.sign({ username }, jwt_secret, { expiresIn: "1hr" });
        }
        resp.json(result);
        resp.end();
    });
    app.post("/signout", async (req, resp) => {
        req.session.destroy(() => {
            resp.redirect("/");
        });
    });
    app.get("/unauthorized", async (req, resp) => {
        resp.render("unauthorized");
    });
};
exports.createAuth = createAuth;
const roleGuard = (role) => {
    return async (req, resp, next) => {
        if (req.authenticated) {
            const username = req.user?.username;
            if (username != undefined
                && await store.validateMembership(username, role)) {
                next();
                return;
            }
            resp.redirect("/unauthorized");
        }
        else {
            resp.redirect("/signin");
        }
    };
};
exports.roleGuard = roleGuard;
const roleHook = (role) => {
    return async (ctx) => {
        if (!ctx.params.authenticated) {
            ctx.http = { status: 401 };
            ctx.result = {};
        }
        else if (!(await store.validateMembership(ctx.params.user.username, role))) {
            ctx.http = { status: 403 };
            ctx.result = {};
        }
    };
};
exports.roleHook = roleHook;
