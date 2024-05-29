import { Sequelize } from "sequelize";
import { initializeCatalogModels } from "./catalog_helpers";

export { ProductModel, CategoryModel, SupplierModel } from "./catalog_models";

export const initializeModels = (sequelize: Sequelize) => {
    initializeCatalogModels(sequelize);
}
