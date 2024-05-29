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

const authCallbackURL: string = getConfig("admin:openauth:redirectionUrl")

declare global {
    namespace Express {
        interface User extends Customer {
            adminUser?: boolean;
        }
    }
}

export const createAuthentication = (app:Express) => {

    passport.use("admin-auth", new GoogleStrategy({
        clientID, clientSecret, callbackURL: authCallbackURL, 
        scope: ["email", "profile"],
        state: true        
    }, (accessToken: string, refreshToken: string, 
            profile: Profile, callback: VerifyCallback) => {
        return callback(null, {
            name: profile.displayName, 
            email: profile.emails?.[0].value ?? "",
            federatedId: profile.id,
            adminUser: true
        })    
    }));

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
        callback(null, user.adminUser ? JSON.stringify(user) : user.id);
    });

    passport.deserializeUser((id: number | string , callbackFunc) => {
        if (typeof id == "string") {
            callbackFunc(null, JSON.parse(id));
        } else {
            customer_repository.getCustomer(id).then(user => 
                callbackFunc(null, user));
        }
    });

    app.use(passport.session());
}
