import { Router } from "express";
import { CategoryModel, ProductModel, SupplierModel } 
    from "../../data/orm/models";
import { readFileSync } from "fs";
import { getConfig } from "../../config";

export const createDbManagementRoutes = (router: Router) => {

    router.get("", (req, resp) => {
        resp.render("admin/db_mgt");
    });

    router.post("/reset", async (req, resp) => {

        await ProductModel.sequelize?.drop();
        await ProductModel.sequelize?.sync();

        const data = JSON.parse(readFileSync(getConfig("catalog:orm_repo")
            .seed_file).toString());
        await ProductModel.sequelize?.transaction(async (transaction) => {
            await SupplierModel.bulkCreate(data.suppliers, { transaction });
            await CategoryModel.bulkCreate(data.categories, { transaction });
            await ProductModel.bulkCreate(data.products, { transaction });
        }); 

        resp.render("admin/db_mgt", {
            admin_msg: "Products database reset and seeded"
        });
    });
}
