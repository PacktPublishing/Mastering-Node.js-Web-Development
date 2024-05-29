"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDTOValidator = void 0;
const validator_1 = require("./validator");
const basic_rules_1 = require("./basic_rules");
const models_1 = require("../orm/models");
const supplierExists = async (status) => {
    const count = await models_1.SupplierModel.count({ where: { id: status.value } });
    if (count !== 1) {
        status.setInvalid(true);
        status.messages.push("A valid supplier is required");
    }
};
const categoryExists = async (status) => {
    const count = await models_1.CategoryModel.count({ where: { id: status.value } });
    if (count !== 1) {
        status.setInvalid(true);
        status.messages.push("A valid category is required");
    }
};
exports.ProductDTOValidator = new validator_1.Validator({
    name: [basic_rules_1.required, (0, basic_rules_1.minLength)(3)],
    description: basic_rules_1.required,
    categoryId: categoryExists,
    supplierId: supplierExists,
    price: basic_rules_1.required,
});
