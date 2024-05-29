import { DataTypes, Sequelize } from "sequelize";
import { CategoryModel, ProductModel, SupplierModel } from "./catalog_models";

const primaryKey = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
};

export const initializeCatalogModels = (sequelize: Sequelize) => {

    ProductModel.init({
        ...primaryKey,
        name: { type: DataTypes.STRING},        
        description: { type: DataTypes.STRING},
        price: { type: DataTypes.DECIMAL(10, 2) }
    }, { sequelize })

    CategoryModel.init({
        ...primaryKey,
        name: { type: DataTypes.STRING}
    }, { sequelize });

    SupplierModel.init({
        ...primaryKey,
        name: { type: DataTypes.STRING}
    }, { sequelize})

    ProductModel.belongsTo(CategoryModel, 
        { foreignKey: "categoryId", as: "category"});    
    ProductModel.belongsTo(SupplierModel, 
        { foreignKey: "supplierId", as: "supplier"});
    CategoryModel.hasMany(ProductModel, 
        { foreignKey: "categoryId", as: "products"});
    SupplierModel.hasMany(ProductModel, 
        { foreignKey: "supplierId", as: "products"});
}
