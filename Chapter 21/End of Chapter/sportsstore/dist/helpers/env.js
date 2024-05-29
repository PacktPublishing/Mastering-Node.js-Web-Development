"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopment = void 0;
const config_1 = require("../config");
const isDevelopment = (value) => {
    console.log(">>>>> " + (0, config_1.getEnvironment)() === config_1.Env.Development);
    return (0, config_1.getEnvironment)() === config_1.Env.Development;
};
exports.isDevelopment = isDevelopment;
