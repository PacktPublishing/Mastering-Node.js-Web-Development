"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.no_op = exports.required = exports.email = exports.minLength = void 0;
const validator_1 = __importDefault(require("validator"));
const minLength = (min) => (status) => {
    if (!validator_1.default.isLength(status.value, { min })) {
        status.setInvalid(true);
        status.messages.push(`Enter at least ${min} characters`);
    }
};
exports.minLength = minLength;
const email = (status) => {
    if (!validator_1.default.isEmail(status.value)) {
        status.setInvalid(true);
        status.messages.push("Enter an email address");
    }
};
exports.email = email;
const required = (status) => {
    if (validator_1.default.isEmpty(status.value.toString(), { ignore_whitespace: true })) {
        status.setInvalid(true);
        status.messages.push("A value is required");
    }
};
exports.required = required;
const no_op = (status) => { };
exports.no_op = no_op;
