"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class ValidationError {
    name;
    message;
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    stack;
    cause;
}
exports.ValidationError = ValidationError;
