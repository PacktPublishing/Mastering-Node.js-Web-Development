"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartDetail = void 0;
const _1 = require(".");
const getCartDetail = async (cart) => {
    const ids = cart.lines.map(l => l.productId);
    const db_data = await _1.catalog_repository.getProductDetails(ids);
    const products = Object.fromEntries(db_data.map(p => [p.id, p]));
    const lines = cart.lines.map(line => ({
        product: products[line.productId],
        quantity: line.quantity,
        subtotal: products[line.productId].price * line.quantity
    }));
    const total = lines.reduce((total, line) => total + line.subtotal, 0);
    return { lines, total };
};
exports.getCartDetail = getCartDetail;
