"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepo = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../config");
const models_1 = require("./models");
const fs_1 = require("fs");
const config = (0, config_1.getConfig)("catalog:orm_repo");
const logging = config.logging
    ? { logging: console.log, logQueryParameters: true }
    : { logging: false };
class BaseRepo {
    sequelize;
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({ ...config.settings, ...logging });
        this.initModelsAndDatabase();
    }
    async initModelsAndDatabase() {
        (0, models_1.initializeModels)(this.sequelize);
        if (config.reset_db) {
            await this.sequelize.drop();
            await this.sequelize.sync();
            await this.addSeedData();
        }
        else {
            await this.sequelize.sync();
        }
    }
    async addSeedData() {
        const data = JSON.parse((0, fs_1.readFileSync)(config.seed_file).toString());
        await this.sequelize.transaction(async (transaction) => {
            await models_1.SupplierModel.bulkCreate(data.suppliers, { transaction });
            await models_1.CategoryModel.bulkCreate(data.categories, { transaction });
            await models_1.ProductModel.bulkCreate(data.products, { transaction });
        });
    }
}
exports.BaseRepo = BaseRepo;
