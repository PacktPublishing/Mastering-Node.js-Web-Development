"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationStatus = void 0;
class ValidationStatus {
    value;
    invalid = false;
    constructor(value) {
        this.value = value;
    }
    get isInvalid() {
        return this.invalid;
    }
    setInvalid(newValue) {
        this.invalid = newValue || this.invalid;
    }
    messages = [];
}
exports.ValidationStatus = ValidationStatus;
