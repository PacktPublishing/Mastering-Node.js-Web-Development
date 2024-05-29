import { Express } from "express";
import { catalog_repository } from "../data";

export const createCatalogRoutes = (app: Express) => {

    app.get("/", async (req, resp) => {
        const products = await catalog_repository.getProducts();
        resp.render("index", { products });
    })

    // app.get("/err", (req, resp) => {
    //     throw new Error ("Something bad happened");
    // });
    
    // app.get("/asyncerr", async (req, resp) => {
    //     throw new Error ("Something bad happened asynchronously");
    // });
}
