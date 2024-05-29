import { createServer } from "http";
import express, {Express, Request, Response } from "express";
import { readHandler } from "./readHandler";

const port = 5000;

const expressApp: Express = express();

expressApp.use(express.json());

expressApp.post("/read", readHandler);

expressApp.get("/sendcity", (req, resp) => {
    resp.sendFile("city.png", { root: "static"});
});

expressApp.get("/downloadcity", (req: Request, resp: Response) => {
    resp.download("static/city.png");
});

expressApp.get("/json", (req: Request, resp: Response) => {
    resp.json("{name: Bob}");
});
    
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

const server = createServer(expressApp);

server.listen(port, 
    () => console.log(`HTTP Server listening on port ${port}`));
