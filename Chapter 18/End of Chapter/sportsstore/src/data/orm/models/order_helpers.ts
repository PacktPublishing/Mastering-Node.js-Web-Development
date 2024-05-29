import { DataTypes, Sequelize } from "sequelize";
import { OrderModel, ProductSelectionModel, AddressModel } 
    from "./order_models";
import { CustomerModel } from "./customer_models";
import { ProductModel } from ".";

const primaryKey = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
};
    
export const initializeOrderModels = (sequelize: Sequelize) => {

    OrderModel.init({
        ...primaryKey, shipped: DataTypes.BOOLEAN
    }, {sequelize});

    ProductSelectionModel.init({
        ...primaryKey,
        quantity: DataTypes.INTEGER, price: DataTypes.DECIMAL(10, 2) 
    }, {sequelize});

    AddressModel.init({
        ...primaryKey,
        street: DataTypes.STRING, city: DataTypes.STRING,
        state: DataTypes.STRING, zip: DataTypes.STRING,
    }, {sequelize});

    OrderModel.belongsTo(CustomerModel, { as: "customer"});
    OrderModel.belongsTo(AddressModel, 
        {foreignKey: "addressId", as: "address"});
    OrderModel.belongsToMany(ProductSelectionModel, 
        { through: "OrderProductJunction", 
            foreignKey: "orderId", as: "selections" });
    ProductSelectionModel.belongsTo(ProductModel, { as: "product"});
}
