"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModelValidation = exports.ResultWebServiceValidation = void 0;
const validator_1 = __importDefault(require("validator"));
const intValidator = {
    validation: [val => validator_1.default.isInt(val.toString())],
    converter: (val) => Number.parseInt(val)
};
const partialResultValidator = {
    name: [(val) => !validator_1.default.isEmpty(val)],
    age: intValidator,
    years: intValidator
};
exports.ResultWebServiceValidation = {
    keyValidator: intValidator,
    store: partialResultValidator,
    replace: {
        ...partialResultValidator,
        nextage: intValidator
    }
};
exports.ResultModelValidation = {
    propertyRules: { ...partialResultValidator, nextage: intValidator },
    modelRule: [(m) => m.nextage === m.age + m.years]
};
