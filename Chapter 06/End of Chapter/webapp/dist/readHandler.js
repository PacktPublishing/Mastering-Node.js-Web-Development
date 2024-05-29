"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, resp) => {
    if (req.headers["content-type"] == "application/json") {
        const payload = req.body;
        if (payload instanceof Array) {
            //resp.write(`Received an array with ${payload.length} items`)
            resp.json({ arraySize: payload.length });
        }
        else {
            resp.write("Did not receive an array");
        }
        resp.end();
    }
    else {
        req.pipe(resp);
    }
};
exports.readHandler = readHandler;
// const createFromJsonTransform = () => new Transform({
//     readableObjectMode: true,
//     transform(data, encoding, callback) {
//         callback(null, JSON.parse(data));
//     }
// });
