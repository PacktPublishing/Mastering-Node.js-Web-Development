"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminRoutes = void 0;
const express_1 = require("express");
const admin_catalog_routes_1 = require("./admin_catalog_routes");
const admin_order_routes_1 = require("./admin_order_routes");
const passport_1 = __importDefault(require("passport"));
const config_1 = require("../../config");
const database_routes_1 = require("./database_routes");
const users = (0, config_1.getConfig)("admin:users", []);
const createAdminRoutes = (app) => {
    app.use((req, resp, next) => {
        resp.locals.layout = false;
        resp.locals.user = req.user;
        next();
    });
    app.get("/admin/signin", (req, resp) => resp.render("admin/signin"));
    app.post("/admin/signout", (req, resp) => req.logOut(() => { resp.redirect("/admin/signin"); }));
    app.get("/admin/google", passport_1.default.authenticate("admin-auth"));
    app.get("/auth-signin-google", passport_1.default.authenticate("admin-auth", {
        successRedirect: "/admin/products", keepSessionInfo: true
    }));
    const authCheck = (r) => users.find(u => r.user?.email === u);
    const apiAuth = (req, resp, next) => {
        if (!authCheck(req)) {
            return resp.sendStatus(401);
        }
        next();
    };
    const cat_router = (0, express_1.Router)();
    (0, admin_catalog_routes_1.createAdminCatalogRoutes)(cat_router);
    app.use("/api/products", apiAuth, cat_router);
    const order_router = (0, express_1.Router)();
    (0, admin_order_routes_1.createAdminOrderRoutes)(order_router);
    app.use("/api/orders", apiAuth, order_router);
    const db_router = (0, express_1.Router)();
    (0, database_routes_1.createDbManagementRoutes)(db_router);
    app.use("/api/database", apiAuth, db_router);
    const userAuth = (req, resp, next) => {
        if (!authCheck(req)) {
            return resp.redirect("/admin/signin");
        }
        next();
    };
    app.get("/admin", userAuth, (req, resp) => resp.redirect("/admin/products"));
    app.get("/admin/products", userAuth, (req, resp) => {
        resp.locals.content = "/api/products/table";
        resp.render("admin/admin_layout");
    });
    app.get("/admin/products/edit/:id", userAuth, (req, resp) => {
        resp.locals.content = `/api/products/edit/${req.params.id}`;
        resp.render("admin/admin_layout");
    });
    app.get("/admin/orders", userAuth, (req, resp) => {
        resp.locals.content = "/api/orders/table";
        resp.render("admin/admin_layout");
    });
    app.get("/admin/database", userAuth, (req, resp) => {
        resp.locals.content = "/api/database";
        resp.render("admin/admin_layout");
    });
};
exports.createAdminRoutes = createAdminRoutes;
