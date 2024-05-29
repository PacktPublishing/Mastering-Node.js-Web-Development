import { Express } from "express";
import { Address } from "../data/order_models";
import { AddressValidator, CustomerValidator, ValidationResults, getData, isValid } 
    from "../data/validation";
import { Customer } from "../data/customer_models";
import { createAndStoreOrder } from "./order_helpers";

declare module "express-session" {
    interface SessionData {
       orderData?: {
            customer?: ValidationResults<Customer>,
            address?: ValidationResults<Address>
       }, 
       pageSize?: string;
    }
}

export const createOrderRoutes = (app: Express) => {

    app.get("/checkout", (req, resp) => {

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
            customer: await CustomerValidator.validate(customer),
            address: await AddressValidator.validate(address)
        };
        if (isValid(data.customer) && isValid(data.address) 
                && req.session.cart) {
            const order = await createAndStoreOrder(
                getData(data.customer), getData(data.address), 
                    req.session.cart
            )
            resp.redirect(`/checkout/${order.id}`);
            req.session.cart = undefined;
            req.session.orderData = undefined;
        } else {
            resp.redirect("/checkout");
        }
    });

    app.get("/checkout/:id", (req, resp) => {
        resp.render("order_complete", {
            id: req.params.id,
            pageSize: req.session.pageSize ?? 3
        });
    })
}
