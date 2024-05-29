"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
console.log(`Worker thread ${worker_threads_1.workerData.request} started`);
for (let iter = 0; iter < worker_threads_1.workerData.iterations; iter++) {
    for (let count = 0; count < worker_threads_1.workerData.total; count++) {
        count++;
    }
    worker_threads_1.parentPort?.postMessage(iter);
}
console.log(`Worker thread ${worker_threads_1.workerData.request} finished`);
