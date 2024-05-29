import { ModelValidation, ValidationError, ValidationRequirements, 
    ValidationRule, WebServiceValidation } from "./validation_types";

export type ValidationResult = [valid: boolean, value: any];

export function validate(data: any, reqs: ValidationRequirements): any {
    let validatedData: any = {};
    Object.entries(reqs).forEach(([prop, rule]) => {
        const [valid, value] = applyRule(data[prop], rule);
        if (valid) {
            validatedData[prop] = value;
        } else {
            throw new ValidationError(prop, "Validation Error");
        }
    });
    return validatedData;
}

function applyRule(val: any, 
        rule: ValidationRule): ValidationResult {
    const required = Array.isArray(rule) ? true : rule.required;
    const checks = Array.isArray(rule) ? rule : rule.validation;
    const convert = Array.isArray(rule) ? (v: any) => v : rule.converter;
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

export function validateIdProperty<T>(val: any, 
        v: WebServiceValidation) : any {
    if (v.keyValidator) {
        const [valid, value] = applyRule(val, v.keyValidator);
        if (valid) {
            return value;
        } 
        throw new ValidationError("ID", "Validation Error");                
    }
    return val;
}

export function validateModel(model: any, rules: ModelValidation) : any {
    if (rules.propertyRules) {
        model = validate(model, rules.propertyRules);
    }
    if (rules.modelRule) {
        const [valid, data] = applyRule(model, rules.modelRule);
        if (valid) {
            return data;
        }
        throw new ValidationError("Model", "Validation Error");                        
    }
}