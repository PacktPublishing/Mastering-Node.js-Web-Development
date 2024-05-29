"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const catalog_1 = require("./catalog");
const cart_1 = require("./cart");
const createRoutes = (app) => {
    (0, cart_1.createCartMiddleware)(app);
    (0, catalog_1.createCatalogRoutes)(app);
    (0, cart_1.createCartRoutes)(app);
};
exports.createRoutes = createRoutes;
