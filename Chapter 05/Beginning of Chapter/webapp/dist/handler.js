"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
//import { Count } from "./counter_cb";
const count_promise_1 = require("./count_promise");
const total = 2000000000;
const iterations = 15;
let shared_counter = 0;
const handler = async (req, res) => {
    const request = shared_counter++;
    try {
        await (0, count_promise_1.Count)(request, iterations, total);
        const msg = `Request: ${request}, Iterations: ${(iterations)}`;
        await promises_1.writePromise.bind(res)(msg + "\n");
        await promises_1.endPromise.bind(res)("Done");
    }
    catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
};
exports.handler = handler;
