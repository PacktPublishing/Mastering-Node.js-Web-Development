"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeCatalogModels = void 0;
const sequelize_1 = require("sequelize");
const catalog_models_1 = require("./catalog_models");
const primaryKey = {
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
};
const initializeCatalogModels = (sequelize) => {
    catalog_models_1.ProductModel.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING },
        description: { type: sequelize_1.DataTypes.STRING },
        price: { type: sequelize_1.DataTypes.DECIMAL(10, 2) }
    }, { sequelize });
    catalog_models_1.CategoryModel.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING }
    }, { sequelize });
    catalog_models_1.SupplierModel.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING }
    }, { sequelize });
    catalog_models_1.ProductModel.belongsTo(catalog_models_1.CategoryModel, { foreignKey: "categoryId", as: "category" });
    catalog_models_1.ProductModel.belongsTo(catalog_models_1.SupplierModel, { foreignKey: "supplierId", as: "supplier" });
    catalog_models_1.CategoryModel.hasMany(catalog_models_1.ProductModel, { foreignKey: "categoryId", as: "products" });
    catalog_models_1.SupplierModel.hasMany(catalog_models_1.ProductModel, { foreignKey: "supplierId", as: "products" });
};
exports.initializeCatalogModels = initializeCatalogModels;
