"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const merge = (target, source) => {
    Object.keys(source).forEach(key => {
        if (typeof source[key] === "object"
            && !Array.isArray(source[key])) {
            if (Object.hasOwn(target, key)) {
                (0, exports.merge)(target[key], source[key]);
            }
            else {
                Object.assign(target, source[key]);
            }
        }
        else {
            target[key] = source[key];
        }
    });
};
exports.merge = merge;
