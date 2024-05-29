import { DataTypes, Sequelize } from "sequelize";
import { CustomerModel } from "./customer_models";

export const initializeCustomerModels = (sequelize: Sequelize) => {

    CustomerModel.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: { type: DataTypes.STRING},        
        email: { type: DataTypes.STRING }
    }, { sequelize})
}
