"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCookie = exports.signCookie = void 0;
const crypto_1 = require("crypto");
const signCookie = (value, secret) => {
    return value + "." + (0, crypto_1.createHmac)("sha512", secret)
        .update(value).digest("base64url");
};
exports.signCookie = signCookie;
const validateCookie = (value, secret) => {
    const cookieValue = value.split(".")[0];
    const compareBuf = Buffer.from((0, exports.signCookie)(cookieValue, secret));
    const candidateBuf = Buffer.from(value);
    if (compareBuf.length == candidateBuf.length &&
        (0, crypto_1.timingSafeEqual)(compareBuf, candidateBuf)) {
        return cookieValue;
    }
    return undefined;
};
exports.validateCookie = validateCookie;
