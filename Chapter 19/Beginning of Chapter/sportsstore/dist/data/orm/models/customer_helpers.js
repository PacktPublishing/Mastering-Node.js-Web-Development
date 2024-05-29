"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCustomerModels = void 0;
const sequelize_1 = require("sequelize");
const customer_models_1 = require("./customer_models");
const initializeCustomerModels = (sequelize) => {
    customer_models_1.CustomerModel.init({
        id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: sequelize_1.DataTypes.STRING },
        email: { type: sequelize_1.DataTypes.STRING }
    }, { sequelize });
};
exports.initializeCustomerModels = initializeCustomerModels;
