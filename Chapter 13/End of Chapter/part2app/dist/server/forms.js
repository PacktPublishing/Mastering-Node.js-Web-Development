"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const session_helpers_1 = require("./sessions/session_helpers");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)("mysecret"));
    //app.use(customSessionMiddleware());
    app.use((0, session_helpers_1.sessionMiddleware)());
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await data_1.default.getAllResults(rowLimit),
            personalHistory: (0, session_helpers_1.getSession)(req).personalHistory
        });
    });
    app.post("/form", async (req, resp) => {
        const nextage = Number.parseInt(req.body.age)
            + Number.parseInt(req.body.years);
        await data_1.default.saveResult({ ...req.body, nextage });
        req.session.personalHistory = [{
                id: 0, name: req.body.name, age: req.body.age,
                years: req.body.years, nextage
            },
            ...(req.session.personalHistory || [])].splice(0, 5);
        const context = {
            ...req.body, nextage,
            history: await data_1.default.getAllResults(rowLimit),
            personalHistory: req.session.personalHistory
        };
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
