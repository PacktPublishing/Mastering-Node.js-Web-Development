"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", async (req, resp) => {
        resp.render("age", {
            history: await data_1.default.getAllResults(rowLimit)
        });
    });
    app.post("/form", async (req, resp) => {
        const nextage = Number.parseInt(req.body.age)
            + Number.parseInt(req.body.years);
        await data_1.default.saveResult({ ...req.body, nextage });
        const context = {
            ...req.body, nextage,
            history: await data_1.default.getResultsByName(req.body.name, rowLimit)
        };
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
