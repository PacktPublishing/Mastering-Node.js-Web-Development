"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const configurePassport = (config) => {
    passport_1.default.use(new passport_local_1.Strategy(async (username, password, callback) => {
        if (await config.store.validateCredentials(username, password)) {
            return callback(null, { username });
        }
        return callback(null, false);
    }));
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret
    }, (payload, callback) => {
        return callback(null, { username: payload.username });
    }));
    passport_1.default.serializeUser((user, callback) => {
        callback(null, user);
    });
    passport_1.default.deserializeUser((user, callback) => {
        callback(null, user);
    });
};
exports.configurePassport = configurePassport;
