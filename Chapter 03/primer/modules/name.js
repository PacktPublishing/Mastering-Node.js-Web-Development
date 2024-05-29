"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
class Name {
    first;
    second;
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    get nameMessage() {
        return `Hello ${this.first} ${this.second}`;
    }
}
exports.Name = Name;
