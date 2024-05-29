import { createServer } from "http";
import express, {Express } from "express";
import { readHandler } from "./readHandler";

const port = 5000;

const expressApp: Express = express();

expressApp.use(express.json());

expressApp.post("/read", readHandler);
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

const server = createServer(expressApp);

server.listen(port, 
    () => console.log(`HTTP Server listening on port ${port}`));