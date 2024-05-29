"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCartRoutes = exports.createCartMiddleware = void 0;
const querystring_1 = require("querystring");
const cart_models_1 = require("../data/cart_models");
const cart_helpers = __importStar(require("../data/cart_helpers"));
const createCartMiddleware = (app) => {
    app.use((req, resp, next) => {
        resp.locals.cart = req.session.cart = req.session.cart ?? (0, cart_models_1.createCart)();
        next();
    });
};
exports.createCartMiddleware = createCartMiddleware;
const createCartRoutes = (app) => {
    app.post("/cart", (req, resp) => {
        const productId = Number.parseInt(req.body.productId);
        if (isNaN(productId)) {
            throw new Error("ID  must be an integer");
        }
        (0, cart_models_1.addLine)(req.session.cart, productId, 1);
        resp.redirect(`/cart?returnUrl=${(0, querystring_1.escape)(req.body.returnUrl ?? "/")}`);
    });
    app.get("/cart", async (req, resp) => {
        const cart = req.session.cart;
        resp.render("cart", {
            cart: await cart_helpers.getCartDetail(cart),
            returnUrl: (0, querystring_1.unescape)(req.query.returnUrl?.toString() ?? "/")
        });
    });
    app.post("/cart/remove", (req, resp) => {
        const id = Number.parseInt(req.body.id);
        if (!isNaN(id)) {
            (0, cart_models_1.removeLine)(req.session.cart, id);
        }
        resp.redirect(`/cart?returnUrl=${(0, querystring_1.escape)(req.body.returnUrl ?? "/")}`);
    });
};
exports.createCartRoutes = createCartRoutes;
