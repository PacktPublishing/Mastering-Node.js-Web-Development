"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthentication = void 0;
const config_1 = require("./config");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const data_1 = require("./data");
const callbackURL = (0, config_1.getConfig)("auth:openauth:redirectionUrl");
const clientID = (0, config_1.getSecret)("GOOGLE_CLIENT_ID");
const clientSecret = (0, config_1.getSecret)("GOOGLE_CLIENT_SECRET");
const createAuthentication = (app) => {
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID, clientSecret, callbackURL,
        scope: ["email", "profile"],
        state: true
    }, async (accessToken, refreshToken, profile, callback) => {
        const emailAddr = profile.emails?.[0].value ?? "";
        const customer = await data_1.customer_repository.storeCustomer({
            name: profile.displayName, email: emailAddr,
            federatedId: profile.id
        });
        const { id, name, email } = customer;
        return callback(null, { id, name, email });
    }));
    passport_1.default.serializeUser((user, callback) => {
        callback(null, user.id);
    });
    passport_1.default.deserializeUser((id, callbackFunc) => {
        data_1.customer_repository.getCustomer(id).then(user => callbackFunc(null, user));
    });
    app.use(passport_1.default.session());
};
exports.createAuthentication = createAuthentication;
