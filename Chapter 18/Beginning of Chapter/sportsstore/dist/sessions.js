"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessions = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("./config");
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const config = (0, config_1.getConfig)("sessions");
const secret = (0, config_1.getSecret)("COOKIE_SECRET");
const logging = config.orm.logging
    ? { logging: console.log, logQueryParameters: true }
    : { logging: false };
const createSessions = (app) => {
    const sequelize = new sequelize_1.Sequelize({
        ...config.orm.settings, ...logging
    });
    const store = new ((0, connect_session_sequelize_1.default)(express_session_1.default.Store))({
        db: sequelize
    });
    if (config.reset_db === true) {
        sequelize.drop().then(() => store.sync());
    }
    else {
        store.sync();
    }
    app.use((0, express_session_1.default)({
        secret, store,
        resave: true, saveUninitialized: false,
        cookie: { maxAge: config.maxAgeHrs * 60 * 60 * 1000,
            sameSite: "strict" }
    }));
};
exports.createSessions = createSessions;
