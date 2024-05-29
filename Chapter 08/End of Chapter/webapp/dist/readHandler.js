"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const promises_1 = require("fs/promises");
const readHandler = async (req, resp) => {
    try {
        resp.setHeader("Content-Type", "application/json");
        resp.write(await (0, promises_1.readFile)("data.json"));
        debugger;
    }
    catch (err) {
        resp.writeHead(500);
    }
    resp.end();
};
exports.readHandler = readHandler;
//# sourceMappingURL=readHandler.js.map