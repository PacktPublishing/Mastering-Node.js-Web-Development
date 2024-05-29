"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLine = exports.addLine = exports.createCart = void 0;
const createCart = () => ({ lines: [] });
exports.createCart = createCart;
const addLine = (cart, productId, quantity) => {
    const line = cart.lines.find(l => l.productId == productId);
    if (line !== undefined) {
        line.quantity += quantity;
    }
    else {
        cart.lines.push({ productId, quantity });
    }
};
exports.addLine = addLine;
const removeLine = (cart, productId) => {
    cart.lines = cart.lines.filter(l => l.productId !== productId);
};
exports.removeLine = removeLine;
