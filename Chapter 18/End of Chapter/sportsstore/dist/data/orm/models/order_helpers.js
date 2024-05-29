"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeOrderModels = void 0;
const sequelize_1 = require("sequelize");
const order_models_1 = require("./order_models");
const customer_models_1 = require("./customer_models");
const _1 = require(".");
const primaryKey = {
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
};
const initializeOrderModels = (sequelize) => {
    order_models_1.OrderModel.init({
        ...primaryKey, shipped: sequelize_1.DataTypes.BOOLEAN
    }, { sequelize });
    order_models_1.ProductSelectionModel.init({
        ...primaryKey,
        quantity: sequelize_1.DataTypes.INTEGER, price: sequelize_1.DataTypes.DECIMAL(10, 2)
    }, { sequelize });
    order_models_1.AddressModel.init({
        ...primaryKey,
        street: sequelize_1.DataTypes.STRING, city: sequelize_1.DataTypes.STRING,
        state: sequelize_1.DataTypes.STRING, zip: sequelize_1.DataTypes.STRING,
    }, { sequelize });
    order_models_1.OrderModel.belongsTo(customer_models_1.CustomerModel, { as: "customer" });
    order_models_1.OrderModel.belongsTo(order_models_1.AddressModel, { foreignKey: "addressId", as: "address" });
    order_models_1.OrderModel.belongsToMany(order_models_1.ProductSelectionModel, { through: "OrderProductJunction",
        foreignKey: "orderId", as: "selections" });
    order_models_1.ProductSelectionModel.belongsTo(_1.ProductModel, { as: "product" });
};
exports.initializeOrderModels = initializeOrderModels;
