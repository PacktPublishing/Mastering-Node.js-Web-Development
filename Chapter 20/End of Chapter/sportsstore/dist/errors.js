"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorHandlers = void 0;
const config_1 = require("./config");
require("express-async-errors");
const template400 = (0, config_1.getConfig)("errors:400");
const template500 = (0, config_1.getConfig)("errors:500");
const createErrorHandlers = (app) => {
    app.use((req, resp) => {
        resp.statusCode = 404;
        resp.render(template400);
    });
    const handler = (error, req, resp, next) => {
        console.log(error);
        if (resp.headersSent) {
            return next(error);
        }
        try {
            resp.statusCode = 500;
            resp.render(template500, { error });
        }
        catch (newErr) {
            next(error);
        }
    };
    app.use(handler);
};
exports.createErrorHandlers = createErrorHandlers;
