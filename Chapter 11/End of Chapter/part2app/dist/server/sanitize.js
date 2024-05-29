"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.santizeValue = void 0;
const matchPattern = /[&<>="'`]/g;
const characterMappings = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "=": "&#x3D;",
    "'": "&#x27;",
    "`": "&#x60;"
};
const santizeValue = (value) => value?.replace(matchPattern, match => characterMappings[match]);
exports.santizeValue = santizeValue;
