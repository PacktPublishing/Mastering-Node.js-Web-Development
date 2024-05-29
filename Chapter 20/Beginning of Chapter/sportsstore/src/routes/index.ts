import { Express } from "express";
import { createCatalogRoutes } from "./catalog";
import { createCartMiddleware, createCartRoutes } from "./cart";
import { createOrderRoutes } from "./orders";

export const createRoutes = (app: Express) => {

    createCartMiddleware(app);

    createCatalogRoutes(app);
    createCartRoutes(app);
    createOrderRoutes(app);
}
