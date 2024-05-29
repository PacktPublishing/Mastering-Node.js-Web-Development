"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, resp) => {
    // resp.json({
    //     message: "Hello, World"
    // });
    resp.cookie("sessionID", "mysecretcode");
    req.pipe(resp);
};
exports.readHandler = readHandler;
//# sourceMappingURL=promises.js.map