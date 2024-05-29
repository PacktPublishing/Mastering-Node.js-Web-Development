"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCustomers = void 0;
const customer_models_1 = require("./models/customer_models");
const order_models_1 = require("./models/order_models");
function AddCustomers(Base) {
    return class extends Base {
        getCustomer(id) {
            return customer_models_1.CustomerModel.findByPk(id, {
                raw: true
            });
        }
        getCustomerByFederatedId(id) {
            return customer_models_1.CustomerModel.findOne({
                where: { federatedId: id },
                raw: true
            });
        }
        getCustomerAddress(id) {
            return order_models_1.AddressModel.findOne({
                include: [{
                        model: order_models_1.OrderModel,
                        where: { customerId: id },
                        attributes: []
                    }],
                order: [["updatedAt", "DESC"]]
            });
        }
        async storeCustomer(customer) {
            const [data, created] = await customer_models_1.CustomerModel.findOrCreate({
                where: { email: customer.email },
                defaults: customer,
            });
            if (!created) {
                data.name = customer.name;
                data.email = customer.email;
                data.federatedId = customer.federatedId;
                await data.save();
            }
            return data;
        }
    };
}
exports.AddCustomers = AddCustomers;
