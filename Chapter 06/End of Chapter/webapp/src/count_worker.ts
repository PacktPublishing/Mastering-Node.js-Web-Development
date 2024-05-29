import { workerData, parentPort  } from "worker_threads";

console.log(`Worker thread ${workerData.request} started`);

for (let iter = 0; iter < workerData.iterations; iter++) {
    for (let count = 0; count < workerData.total; count++) {
        count++;
    }
    parentPort?.postMessage(iter);
}

console.log(`Worker thread ${workerData.request} finished`);
