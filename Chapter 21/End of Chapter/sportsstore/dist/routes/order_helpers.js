"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndStoreOrder = void 0;
const data_1 = require("../data");
const createAndStoreOrder = async (customer, address, cart) => {
    const product_ids = cart.lines.map(l => l.productId) ?? [];
    const product_details = Object.fromEntries((await data_1.catalog_repository.getProductDetails(product_ids))
        .map(p => [p.id ?? 0, p.price ?? 0]));
    const selections = cart.lines.map(l => ({
        productId: l.productId, quantity: l.quantity,
        price: product_details[l.productId]
    }));
    return data_1.order_repository.storeOrder({
        customer, address,
        selections, shipped: false
    });
};
exports.createAndStoreOrder = createAndStoreOrder;
