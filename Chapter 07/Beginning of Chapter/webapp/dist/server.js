"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
expressApp.post("/read", readHandler_1.readHandler);
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
