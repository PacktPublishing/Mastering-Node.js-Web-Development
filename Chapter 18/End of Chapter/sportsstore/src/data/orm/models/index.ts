import { Sequelize } from "sequelize";
import { initializeCatalogModels } from "./catalog_helpers";
import { initializeCustomerModels } from "./customer_helpers";
import { initializeOrderModels } from "./order_helpers";

export { ProductModel, CategoryModel, SupplierModel } from "./catalog_models";

export const initializeModels = (sequelize: Sequelize) => {
    initializeCatalogModels(sequelize);
    initializeCustomerModels(sequelize);
    initializeOrderModels(sequelize);
}
