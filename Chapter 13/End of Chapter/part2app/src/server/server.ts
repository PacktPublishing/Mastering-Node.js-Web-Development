import { createServer } from "http";
import express, {Express } from "express";
import httpProxy from "http-proxy";
import helmet from "helmet";
import { engine } from "express-handlebars";
import { registerFormMiddleware, registerFormRoutes } from "./forms";

const port = 5000;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
    target: "http://localhost:5100", ws: true
});

expressApp.set("views", "templates/server");
expressApp.engine("handlebars", engine());
expressApp.set("view engine", "handlebars");

expressApp.use(helmet());
expressApp.use(express.json());

registerFormMiddleware(expressApp);
registerFormRoutes(expressApp);

expressApp.use("^/$", (req, resp) => resp.redirect("/form"));

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

expressApp.use((req, resp) => proxy.web(req, resp));

const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, 
    () => console.log(`HTTP Server listening on port ${port}`));
