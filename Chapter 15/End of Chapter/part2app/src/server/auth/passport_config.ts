import passport from "passport";
import { Strategy as LocalStrategy }  from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt  } from "passport-jwt";
import { AuthStore } from "./auth_types";

type Config = {
    jwt_secret: string,
    store: AuthStore
}

export const configurePassport = (config: Config) => {

    passport.use(new LocalStrategy(async (username, password, callback) => {
        if (await config.store.validateCredentials(username, password)) {
            return callback(null, { username });
        } 
        return callback(null, false);
    }));

    passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt_secret
    }, (payload, callback) => {
        return callback(null, { username: payload.username });
    }));

    passport.serializeUser((user, callback) => {
        callback(null, user);
    });

    passport.deserializeUser((user, callback) => {
        callback(null, user as Express.User );
    });    
}
