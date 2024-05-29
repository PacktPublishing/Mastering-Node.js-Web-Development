import { Express } from "express";
import { escape, unescape } from "querystring";
import { Cart, addLine, createCart, removeLine } from "../data/cart_models";
import * as cart_helpers from "../data/cart_helpers";

declare module "express-session" {
    interface SessionData {
       cart?: Cart;
    }
}

export const createCartMiddleware = (app: Express) => {
    app.use((req, resp, next) => {
        resp.locals.cart = req.session.cart = req.session.cart ?? createCart()
        next();
    })
}

export const createCartRoutes = (app: Express) => {
    
    app.post("/cart", (req, resp) => {
        const productId = Number.parseInt(req.body.productId);
        if (isNaN(productId)) {
            throw new Error("ID  must be an integer");
        }
        addLine(req.session.cart as Cart, productId, 1);
        resp.redirect(`/cart?returnUrl=${escape(req.body.returnUrl ?? "/")}`);
    });

    app.get("/cart", async (req, resp) => {
        const cart = req.session.cart as Cart;
        resp.render("cart", {
            cart: await cart_helpers.getCartDetail(cart),
            returnUrl: unescape(req.query.returnUrl?.toString() ?? "/")
        });
    });

    app.post("/cart/remove", (req, resp) => {
        const id = Number.parseInt(req.body.id);
        if (!isNaN(id)) {
            removeLine(req.session.cart as Cart, id);
        }
        resp.redirect(`/cart?returnUrl=${escape(req.body.returnUrl ?? "/")}`);
    });
}
