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
const auth_1 = require("./auth");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)("mysecret"));
    app.use((0, session_helpers_1.sessionMiddleware)());
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("data", { data: await data_1.default.getAllResults(rowLimit) });
    });
    app.post("/form/delete/:id", (0, auth_1.roleGuard)("Admins"), async (req, resp) => {
        const id = Number.parseInt(req.params["id"]);
        await data_1.default.delete(id);
        resp.redirect("/form");
        resp.end();
    });
    app.post("/form/add", (0, auth_1.roleGuard)("Users"), async (req, resp) => {
        const nextage = Number.parseInt(req.body["age"])
            + Number.parseInt(req.body["years"]);
        await data_1.default.saveResult({ ...req.body, nextage });
        resp.redirect("/form");
        resp.end();
    });
};
exports.registerFormRoutes = registerFormRoutes;
