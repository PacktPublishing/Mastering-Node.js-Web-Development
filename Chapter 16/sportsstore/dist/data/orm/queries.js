"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQueries = void 0;
const models_1 = require("./models");
function AddQueries(Base) {
    return class extends Base {
        getProducts() {
            return models_1.ProductModel.findAll({
                include: [
                    { model: models_1.SupplierModel, as: "supplier" },
                    { model: models_1.CategoryModel, as: "category" }
                ],
                raw: true, nest: true
            });
        }
        getCategories() {
            return models_1.CategoryModel.findAll({
                raw: true, nest: true
            });
        }
        getSuppliers() {
            return models_1.SupplierModel.findAll({
                raw: true, nest: true
            });
        }
    };
}
exports.AddQueries = AddQueries;
