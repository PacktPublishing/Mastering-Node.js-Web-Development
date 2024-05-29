import { Express } from "express";
import { catalog_repository } from "../data";

export const createCatalogRoutes = (app: Express) => {

    app.get("/", async (req, resp) => {
        const page = Number.parseInt(req.query.page?.toString() ?? "1");
        const pageSize =Number.parseInt(req.query.pageSize?.toString() ?? "3")
        const searchTerm = req.query.searchTerm?.toString();
        const category = Number.parseInt(req.query.category?.toString() ?? "")

        const res = await catalog_repository.getProducts({ page, pageSize, 
            searchTerm, category});

        resp.render("index", { ...res, page, pageSize, 
            pageCount: Math.ceil(res.totalCount / (pageSize ?? 1)), 
            searchTerm, category, show_cart: true
        });
    });
}
