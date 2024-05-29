"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const handler_1 = require("./handler");
const port = 5000;
const server = (0, http_1.createServer)();
server.on("request", (req, res) => {
    if (req.url?.endsWith("favicon.ico")) {
        res.statusCode = 404;
        res.end();
    }
    else {
        (0, handler_1.handler)(req, res);
    }
});
server.listen(port);
server.on("listening", () => {
    console.log(`(Event) Server listening on port ${port}`);
});
