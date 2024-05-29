import { Router } from "express";
import { CategoryModel, ProductModel, SupplierModel } 
    from "../../data/orm/models";
import { ProductDTOValidator, getData, isValid } from "../../data/validation";

export const createAdminCatalogRoutes = (router: Router) => {

    router.get("/table", async (req, resp) => {
        const products = await ProductModel.findAll({
                include: [
                    {model: SupplierModel, as: "supplier" },
                    {model: CategoryModel, as: "category" }],
                raw: true, nest: true
        });
        resp.render("admin/product_table", { products });
    });

    router.delete("/:id", async (req, resp) => {
        const id = req.params.id;
        const count = await ProductModel.destroy({ where: { id }});
        if (count == 1) {
            resp.end();
        } else {
            throw Error(`Unexpected deletion count result: ${count}`)
        }
    });
    

    router.get("/edit/:id", async (req, resp) => {
        const id = req.params.id;
        const data = {
            product: { id: { value: id },
                ...await ProductDTOValidator.validate(
                await ProductModel.findByPk(id, { raw: true}))},
            suppliers: await SupplierModel.findAll({raw: true}),
            categories: await CategoryModel.findAll({raw: true})
        };
        resp.render("admin/product_editor", data);
    });

    router.put("/:id", async (req, resp) => {
        const validation = await ProductDTOValidator.validate(req.body);
        if (isValid(validation)) {
            await ProductModel.update(
                getData(validation), { where: { id: req.params.id}}
            );
            resp.redirect(303, "/api/products/table");
        } else {
            resp.render("admin/product_editor", {
                product: { id: { value: req.params.id} , ...validation },
                suppliers: await SupplierModel.findAll({raw: true}),
                categories: await CategoryModel.findAll({raw: true})
            })
        }
    });    

    router.get("/create", async (req, resp) => {
        const data = {
            product: {},
            suppliers: await SupplierModel.findAll({raw: true}),
            categories: await CategoryModel.findAll({raw: true}),
            create: true
        };
        resp.render("admin/product_editor", data);
    });

    router.post("/create", async (req, resp) => {
        const validation = await ProductDTOValidator.validate(req.body);
        if (isValid(validation)) {
            await ProductModel.create(getData(validation));
            resp.redirect(303, "/api/products/table");
        } else {
            resp.render("admin/product_editor", {
                product: validation,
                suppliers: await SupplierModel.findAll({raw: true}),
                categories: await CategoryModel.findAll({raw: true}),
                create: true
            })
        }
    });   

}
