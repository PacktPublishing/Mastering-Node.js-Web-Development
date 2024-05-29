"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Count = void 0;
const worker_threads_1 = require("worker_threads");
const Count = (request, iterations, total) => {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
            workerData: {
                iterations, total, request
            }
        });
        worker.on("message", (iter) => {
            const msg = `Request: ${request}, Iteration: ${(iter)}`;
            console.log(msg);
        });
        worker.on("exit", (code) => {
            if (code !== 0) {
                reject();
            }
            else {
                resolve();
            }
        });
        worker.on("error", reject);
    });
};
exports.Count = Count;
