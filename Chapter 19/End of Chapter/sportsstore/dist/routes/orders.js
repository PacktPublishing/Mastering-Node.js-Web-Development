"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderRoutes = void 0;
const validation_1 = require("../data/validation");
const order_helpers_1 = require("./order_helpers");
const data_1 = require("../data");
const passport_1 = __importDefault(require("passport"));
const createOrderRoutes = (app) => {
    app.get("/checkout/google", passport_1.default.authenticate("google"));
    app.get("/signin-google", passport_1.default.authenticate("google", { successRedirect: "/checkout", keepSessionInfo: true }));
    app.get("/checkout", async (req, resp) => {
        if (!req.session.orderData && req.user) {
            req.session.orderData = {
                customer: await validation_1.CustomerValidator.validate(req.user),
                address: await validation_1.AddressValidator.validate(await data_1.customer_repository.getCustomerAddress(req.user?.id ?? 0) ?? {})
            };
        }
        req.session.pageSize =
            req.session.pageSize ?? req.query.pageSize?.toString() ?? "3";
        resp.render("order_details", {
            order: req.session.orderData,
            page: 1,
            pageSize: req.session.pageSize
        });
    });
    app.post("/checkout", async (req, resp) => {
        const { customer, address } = req.body;
        const data = req.session.orderData = {
            customer: await validation_1.CustomerValidator.validate(customer),
            address: await validation_1.AddressValidator.validate(address)
        };
        if ((0, validation_1.isValid)(data.customer) && (0, validation_1.isValid)(data.address)
            && req.session.cart) {
            const order = await (0, order_helpers_1.createAndStoreOrder)((0, validation_1.getData)(data.customer), (0, validation_1.getData)(data.address), req.session.cart);
            resp.redirect(`/checkout/${order.id}`);
            req.session.cart = undefined;
            req.session.orderData = undefined;
        }
        else {
            resp.redirect("/checkout");
        }
    });
    app.get("/checkout/:id", (req, resp) => {
        resp.render("order_complete", {
            id: req.params.id,
            pageSize: req.session.pageSize ?? 3
        });
    });
};
exports.createOrderRoutes = createOrderRoutes;
