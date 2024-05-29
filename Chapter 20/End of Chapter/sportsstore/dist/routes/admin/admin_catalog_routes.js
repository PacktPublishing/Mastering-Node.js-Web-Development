"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminCatalogRoutes = void 0;
const models_1 = require("../../data/orm/models");
const validation_1 = require("../../data/validation");
const createAdminCatalogRoutes = (router) => {
    router.get("/table", async (req, resp) => {
        const products = await models_1.ProductModel.findAll({
            include: [
                { model: models_1.SupplierModel, as: "supplier" },
                { model: models_1.CategoryModel, as: "category" }
            ],
            raw: true, nest: true
        });
        resp.render("admin/product_table", { products });
    });
    router.delete("/:id", async (req, resp) => {
        const id = req.params.id;
        const count = await models_1.ProductModel.destroy({ where: { id } });
        if (count == 1) {
            resp.end();
        }
        else {
            throw Error(`Unexpected deletion count result: ${count}`);
        }
    });
    router.get("/edit/:id", async (req, resp) => {
        const id = req.params.id;
        const data = {
            product: { id: { value: id },
                ...await validation_1.ProductDTOValidator.validate(await models_1.ProductModel.findByPk(id, { raw: true })) },
            suppliers: await models_1.SupplierModel.findAll({ raw: true }),
            categories: await models_1.CategoryModel.findAll({ raw: true })
        };
        resp.render("admin/product_editor", data);
    });
    router.put("/:id", async (req, resp) => {
        const validation = await validation_1.ProductDTOValidator.validate(req.body);
        if ((0, validation_1.isValid)(validation)) {
            await models_1.ProductModel.update((0, validation_1.getData)(validation), { where: { id: req.params.id } });
            resp.redirect(303, "/api/products/table");
        }
        else {
            resp.render("admin/product_editor", {
                product: { id: { value: req.params.id }, ...validation },
                suppliers: await models_1.SupplierModel.findAll({ raw: true }),
                categories: await models_1.CategoryModel.findAll({ raw: true })
            });
        }
    });
    router.get("/create", async (req, resp) => {
        const data = {
            product: {},
            suppliers: await models_1.SupplierModel.findAll({ raw: true }),
            categories: await models_1.CategoryModel.findAll({ raw: true }),
            create: true
        };
        resp.render("admin/product_editor", data);
    });
    router.post("/create", async (req, resp) => {
        const validation = await validation_1.ProductDTOValidator.validate(req.body);
        if ((0, validation_1.isValid)(validation)) {
            await models_1.ProductModel.create((0, validation_1.getData)(validation));
            resp.redirect(303, "/api/products/table");
        }
        else {
            resp.render("admin/product_editor", {
                product: validation,
                suppliers: await models_1.SupplierModel.findAll({ raw: true }),
                categories: await models_1.CategoryModel.findAll({ raw: true }),
                create: true
            });
        }
    });
};
exports.createAdminCatalogRoutes = createAdminCatalogRoutes;
