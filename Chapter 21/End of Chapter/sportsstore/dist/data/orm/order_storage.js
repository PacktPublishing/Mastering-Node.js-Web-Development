"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrderStorage = void 0;
const order_models_1 = require("./models/order_models");
const customer_models_1 = require("./models/customer_models");
function AddOrderStorage(Base) {
    return class extends Base {
        storeOrder(order) {
            return this.sequelize.transaction(async (transaction) => {
                const { id, shipped } = order;
                const [stored] = await order_models_1.OrderModel.upsert({ id, shipped }, { transaction });
                if (order.customer) {
                    const [{ id }] = await customer_models_1.CustomerModel.findOrCreate({
                        where: { email: order.customer.email },
                        defaults: order.customer,
                        transaction
                    });
                    stored.customerId = id;
                }
                if (order.address) {
                    const [{ id }] = await order_models_1.AddressModel.findOrCreate({
                        where: { ...order.address },
                        defaults: order.address,
                        transaction
                    });
                    stored.addressId = id;
                }
                await stored.save({ transaction });
                if (order.selections) {
                    const sels = await order_models_1.ProductSelectionModel.bulkCreate(order.selections, { transaction });
                    await stored.setSelections(sels, { transaction });
                }
                return stored;
            });
        }
    };
}
exports.AddOrderStorage = AddOrderStorage;
