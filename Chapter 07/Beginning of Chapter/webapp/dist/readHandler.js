"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, resp) => {
    resp.json({
        message: "Hello, World"
    });
};
exports.readHandler = readHandler;
