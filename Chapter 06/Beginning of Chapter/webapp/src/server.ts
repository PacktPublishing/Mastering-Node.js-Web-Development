import { createServer } from "http";
import { redirectionHandler, newUrlHandler, defaultHandler, 
            notFoundHandler } from "./handler";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import express, { Express } from "express";

const port = 5000;
const https_port = 5500;

const server = createServer(redirectionHandler);

server.listen(port, 
    () => console.log(`(Event) Server listening on port ${port}`));

const httpsConfig = {
    key: readFileSync("key.pem"), 
    cert: readFileSync("cert.pem")
};    

const expressApp: Express = express();
expressApp.get("/favicon.ico", notFoundHandler);
expressApp.get("/newurl/:message?", newUrlHandler);
expressApp.get("*", defaultHandler);

const httpsServer = createHttpsServer(httpsConfig, expressApp);

httpsServer.listen(https_port, 
    () => console.log(`HTTPS Server listening on port ${https_port}`));