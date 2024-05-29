import { Express } from "express";
import { createCatalogRoutes } from "./catalog";

export const createRoutes = (app: Express) => {

    createCatalogRoutes(app);
}
