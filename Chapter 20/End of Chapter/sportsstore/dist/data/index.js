"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer_repository = exports.order_repository = exports.catalog_repository = void 0;
const orm_1 = require("./orm");
const repo = new orm_1.CatalogRepoImpl();
exports.catalog_repository = repo;
exports.order_repository = repo;
exports.customer_repository = repo;
