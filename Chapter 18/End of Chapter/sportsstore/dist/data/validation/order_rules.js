"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidator = exports.CustomerValidator = void 0;
const validator_1 = require("./validator");
const basic_rules_1 = require("./basic_rules");
exports.CustomerValidator = new validator_1.Validator({
    name: [basic_rules_1.required, (0, basic_rules_1.minLength)(6)],
    email: basic_rules_1.email
});
exports.AddressValidator = new validator_1.Validator({
    street: basic_rules_1.required,
    city: basic_rules_1.required,
    state: basic_rules_1.required,
    zip: basic_rules_1.no_op
});
