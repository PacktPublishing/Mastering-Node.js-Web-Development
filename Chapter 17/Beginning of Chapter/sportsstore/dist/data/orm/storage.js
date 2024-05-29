"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStorage = void 0;
const models_1 = require("./models");
function AddStorage(Base) {
    return class extends Base {
        storeProduct(p) {
            return this.sequelize.transaction(async (transaction) => {
                if (p.category) {
                    p.category = await this.storeCategory(p.category);
                }
                if (p.supplier) {
                    p.supplier = await this.storeSupplier(p.supplier);
                }
                const [stored] = await models_1.ProductModel.upsert({
                    id: p.id, name: p.name, description: p.description,
                    price: p.price, categoryId: p.category?.id,
                    supplierId: p.supplier?.id
                }, { transaction });
                return stored;
            });
        }
        async storeCategory(c, transaction) {
            const [stored] = await models_1.CategoryModel.upsert({
                id: c.id, name: c.name
            }, { transaction });
            return stored;
        }
        async storeSupplier(s, transaction) {
            const [stored] = await models_1.SupplierModel.upsert({
                id: s.id, name: s.name
            }, { transaction });
            return stored;
        }
    };
}
exports.AddStorage = AddStorage;
