"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminOrderRoutes = void 0;
const order_models_1 = require("../../data/orm/models/order_models");
const customer_models_1 = require("../../data/orm/models/customer_models");
const models_1 = require("../../data/orm/models");
const createAdminOrderRoutes = (router) => {
    router.get("/table", async (req, resp) => {
        const orders = (await order_models_1.OrderModel.findAll({
            include: [
                { model: customer_models_1.CustomerModel, as: "customer" },
                { model: order_models_1.AddressModel, as: "address" },
                { model: order_models_1.ProductSelectionModel, as: "selections",
                    include: [{ model: models_1.ProductModel, as: "product" }]
                }
            ],
            order: ["shipped", "id"]
        })).map(o => o.toJSON());
        resp.render("admin/order_table", { orders });
    });
    router.post("/ship", async (req, resp) => {
        const { id, shipped } = req.body;
        const [rows] = await order_models_1.OrderModel.update({ shipped }, { where: { id } });
        if (rows === 1) {
            resp.redirect(303, "/api/orders/table");
        }
        else {
            throw new Error(`Expected 1 row updated, but got ${rows}`);
        }
    });
};
exports.createAdminOrderRoutes = createAdminOrderRoutes;
