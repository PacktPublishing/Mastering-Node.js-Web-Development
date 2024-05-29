"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbManagementRoutes = void 0;
const models_1 = require("../../data/orm/models");
const fs_1 = require("fs");
const config_1 = require("../../config");
const createDbManagementRoutes = (router) => {
    router.get("", (req, resp) => {
        resp.render("admin/db_mgt");
    });
    router.post("/reset", async (req, resp) => {
        await models_1.ProductModel.sequelize?.drop();
        await models_1.ProductModel.sequelize?.sync();
        const data = JSON.parse((0, fs_1.readFileSync)((0, config_1.getConfig)("catalog:orm_repo")
            .seed_file).toString());
        await models_1.ProductModel.sequelize?.transaction(async (transaction) => {
            await models_1.SupplierModel.bulkCreate(data.suppliers, { transaction });
            await models_1.CategoryModel.bulkCreate(data.categories, { transaction });
            await models_1.ProductModel.bulkCreate(data.products, { transaction });
        });
        resp.render("admin/db_mgt", {
            admin_msg: "Products database reset and seeded"
        });
    });
};
exports.createDbManagementRoutes = createDbManagementRoutes;
