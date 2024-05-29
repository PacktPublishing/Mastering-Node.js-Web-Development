import { Express, NextFunction, Request, Response, Router } from "express";
import { createAdminCatalogRoutes } from "./admin_catalog_routes";
import { createAdminOrderRoutes } from "./admin_order_routes";
import passport from "passport";
import { getConfig} from "../../config";

const users: string[] = getConfig("admin:users", []);

export const createAdminRoutes = (app: Express) => {

    app.use((req, resp, next) => {
        resp.locals.layout = false;
        resp.locals.user = req.user;
        next();
    });

    app.get("/admin/signin", (req, resp) => resp.render("admin/signin"));

    app.post("/admin/signout", (req, resp) => 
        req.logOut(() => { resp.redirect("/admin/signin") }));

    app.get("/admin/google", passport.authenticate("admin-auth"));

    app.get("/auth-signin-google", passport.authenticate("admin-auth", {
        successRedirect: "/admin/products", keepSessionInfo: true
    }));    

    const authCheck = (r: Request) => users.find(u => r.user?.email === u);

    const apiAuth = (req: Request, resp: Response, next: NextFunction) => {
        if (!authCheck(req)) {
            return resp.sendStatus(401)
        }
        next();
    };

    const cat_router = Router();
    createAdminCatalogRoutes(cat_router);
    app.use("/api/products", apiAuth, cat_router);

    const order_router = Router();
    createAdminOrderRoutes(order_router);
    app.use("/api/orders", apiAuth, order_router);

    const userAuth = (req: Request, resp: Response, next: NextFunction) => {
        if (!authCheck(req)) {
            return resp.redirect("/admin/signin");
        }
        next();
    };

    app.get("/admin", userAuth, (req, resp) => 
        resp.redirect("/admin/products"));

    app.get("/admin/products", userAuth, (req, resp) => {
        resp.locals.content = "/api/products/table";
        resp.render("admin/admin_layout");
    })

    app.get("/admin/products/edit/:id", userAuth, (req, resp) => {
        resp.locals.content = `/api/products/edit/${req.params.id}`;
        resp.render("admin/admin_layout");
    })

    app.get("/admin/orders", userAuth, (req, resp) => {
        resp.locals.content = "/api/orders/table";
        resp.render("admin/admin_layout");
    })
}
