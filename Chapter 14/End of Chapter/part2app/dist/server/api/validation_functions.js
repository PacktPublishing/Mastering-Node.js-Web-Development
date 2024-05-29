"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModel = exports.validateIdProperty = exports.validate = void 0;
const validation_types_1 = require("./validation_types");
function validate(data, reqs) {
    let validatedData = {};
    Object.entries(reqs).forEach(([prop, rule]) => {
        const [valid, value] = applyRule(data[prop], rule);
        if (valid) {
            validatedData[prop] = value;
        }
        else {
            throw new validation_types_1.ValidationError(prop, "Validation Error");
        }
    });
    return validatedData;
}
exports.validate = validate;
function applyRule(val, rule) {
    const required = Array.isArray(rule) ? true : rule.required;
    const checks = Array.isArray(rule) ? rule : rule.validation;
    const convert = Array.isArray(rule) ? (v) => v : rule.converter;
    if (val === null || val == undefined || val === "") {
        return [required ? false : true, val];
    }
    let valid = true;
    checks.forEach(check => {
        if (!check(val)) {
            valid = false;
        }
    });
    return [valid, convert ? convert(val) : val];
}
function validateIdProperty(val, v) {
    if (v.keyValidator) {
        const [valid, value] = applyRule(val, v.keyValidator);
        if (valid) {
            return value;
        }
        throw new validation_types_1.ValidationError("ID", "Validation Error");
    }
    return val;
}
exports.validateIdProperty = validateIdProperty;
function validateModel(model, rules) {
    if (rules.propertyRules) {
        model = validate(model, rules.propertyRules);
    }
    if (rules.modelRule) {
        const [valid, data] = applyRule(model, rules.modelRule);
        if (valid) {
            return data;
        }
        throw new validation_types_1.ValidationError("Model", "Validation Error");
    }
}
exports.validateModel = validateModel;
