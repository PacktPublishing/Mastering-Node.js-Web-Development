"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const catalog_1 = require("./catalog");
const createRoutes = (app) => {
    (0, catalog_1.createCatalogRoutes)(app);
};
exports.createRoutes = createRoutes;
