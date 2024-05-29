"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOdd = exports.increment = exports.valueOrZero = exports.style = void 0;
const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
exports.style = style;
const valueOrZero = (value) => {
    return value !== undefined ? value : 0;
};
exports.valueOrZero = valueOrZero;
const increment = (value) => {
    return Number((0, exports.valueOrZero)(value)) + 1;
};
exports.increment = increment;
const isOdd = (value) => {
    return Number((0, exports.valueOrZero)(value)) % 2;
};
exports.isOdd = isOdd;
