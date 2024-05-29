"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderQueries = void 0;
const order_models_1 = require("./models/order_models");
const customer_models_1 = require("./models/customer_models");
const queryConfig = {
    include: [
        { model: order_models_1.AddressModel, as: "address" },
        { model: customer_models_1.CustomerModel, as: "customer" }
    ],
    raw: true, nest: true
};
function AddOrderQueries(Base) {
    return class extends Base {
        getOrder(id) {
            return order_models_1.OrderModel.findByPk(id, queryConfig);
        }
        getOrders(excludeShipped) {
            return order_models_1.OrderModel.findAll(excludeShipped ?
                { ...queryConfig, where: { shipped: false } } : queryConfig);
        }
    };
}
exports.AddOrderQueries = AddOrderQueries;
