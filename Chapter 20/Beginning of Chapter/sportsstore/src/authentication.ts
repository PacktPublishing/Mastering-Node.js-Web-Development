import { Express } from "express";
import { getConfig, getSecret } from "./config";
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } 
    from "passport-google-oauth20";
import { customer_repository } from "./data";
import { Customer } from "./data/customer_models";

const callbackURL: string = getConfig("auth:openauth:redirectionUrl");
const clientID = getSecret("GOOGLE_CLIENT_ID");
const clientSecret = getSecret("GOOGLE_CLIENT_SECRET");

declare global {
    namespace Express {
        interface User extends Customer {  }
    }
}

export const createAuthentication = (app:Express) => {

    passport.use(new GoogleStrategy({ 
        clientID, clientSecret, callbackURL, 
        scope: ["email", "profile"],
        state: true
    } , async (accessToken: string, refreshToken: string, 
            profile: Profile, callback: VerifyCallback) => {
        const emailAddr = profile.emails?.[0].value ?? "";            
        const customer = await customer_repository.storeCustomer({
            name: profile.displayName, email: emailAddr,
            federatedId: profile.id
        });
        const { id, name, email } = customer;
        return callback(null, { id, name, email });
    }));

    passport.serializeUser((user, callback) => {
        callback(null, user.id);
    });

    passport.deserializeUser((id: number, callbackFunc) => {
        customer_repository.getCustomer(id).then(user => 
            callbackFunc(null, user));
    });

    app.use(passport.session());
}
