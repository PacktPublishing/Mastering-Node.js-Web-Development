"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = exports.getSession = void 0;
//import { Session } from "./repository";
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const sequelize_1 = require("sequelize");
const getSession = (req) => req.session;
exports.getSession = getSession;
const sessionMiddleware = () => {
    const sequelize = new sequelize_1.Sequelize({
        dialect: "sqlite",
        storage: "pkg_sessions.db"
    });
    const store = new ((0, connect_session_sequelize_1.default)(express_session_1.default.Store))({
        db: sequelize
    });
    store.sync();
    return (0, express_session_1.default)({
        secret: "mysecret",
        store: store,
        cookie: { maxAge: 300 * 1000, sameSite: "strict" },
        resave: false, saveUninitialized: false
    });
};
exports.sessionMiddleware = sessionMiddleware;
