"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const validation_1 = require("./validation");
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get("/form", (req, resp) => {
        resp.render("age", { helpers: { pass } });
    });
    app.post("/form", (0, validation_1.validate)("name").required().minLength(5), (0, validation_1.validate)("age").isInteger(), (req, resp) => {
        const validation = (0, validation_1.getValidationResults)(req);
        const context = { ...req.body, validation,
            helpers: { pass }
        };
        if (validation.valid) {
            context.nextage = Number.parseInt(req.body.age) + 1;
        }
        resp.render("age", context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
const pass = (valid, propname, test) => {
    let propResult = valid?.results?.[propname];
    return `display:${!propResult || propResult[test] ? "none" : "block"}`;
};
