import { Express } from "express";
import { createCatalogRoutes } from "./catalog";
import { createCartMiddleware, createCartRoutes } from "./cart";
import { createOrderRoutes } from "./orders";
import { createAdminRoutes } from "./admin";

export const createRoutes = (app: Express) => {

    createCartMiddleware(app);

    createCatalogRoutes(app);
    createCartRoutes(app);
    createOrderRoutes(app);
    createAdminRoutes(app);
}
