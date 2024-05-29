"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countCartItems = void 0;
const countCartItems = (cart) => cart.lines.reduce((total, line) => total + line.quantity, 0);
exports.countCartItems = countCartItems;
