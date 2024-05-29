"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.redirectionHandler = void 0;
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        "Location": "https://localhost:5500"
    });
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404);
};
exports.notFoundHandler = notFoundHandler;
const newUrlHandler = (req, resp) => {
    const msg = req.params.message ?? "(No Message)";
    resp.send(`Hello, ${msg}`);
};
exports.newUrlHandler = newUrlHandler;
const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${req.query.keyword}`);
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`);
    }
};
exports.defaultHandler = defaultHandler;
