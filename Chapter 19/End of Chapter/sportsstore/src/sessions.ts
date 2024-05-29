import { Express } from "express";
import { Sequelize } from "sequelize";
import { getConfig, getSecret } from "./config";
import session from "express-session";
import sessionStore from "connect-session-sequelize";

const config = getConfig("sessions");

const secret = getSecret("COOKIE_SECRET");

const logging = config.orm.logging 
        ? { logging: console.log, logQueryParameters: true}
        : { logging: false };

export const createSessions = (app: Express) => {

    const sequelize = new Sequelize({
        ...config.orm.settings, ...logging
    });

    const store = new (sessionStore(session.Store))({
        db: sequelize
    });

    if (config.reset_db === true) {
        sequelize.drop().then(() => store.sync());
    } else {
        store.sync();
    }

    app.use(session({
        secret, store,
        resave: false, saveUninitialized: true,
        cookie: { 
            maxAge: config.maxAgeHrs * 60 * 60 * 1000, 
            sameSite: false, httpOnly: false, secure: false }
    }));    
}
