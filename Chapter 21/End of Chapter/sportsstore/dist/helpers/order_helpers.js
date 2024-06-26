"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.getValue = exports.lower = exports.toArray = void 0;
const toArray = (...args) => args.slice(0, -1);
exports.toArray = toArray;
const lower = (val) => val.toLowerCase();
exports.lower = lower;
const getValue = (val, prop) => val?.[prop.toLowerCase()] ?? {};
exports.getValue = getValue;
const get = (val) => val ?? {};
exports.get = get;
