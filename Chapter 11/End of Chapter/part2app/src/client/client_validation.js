import validator from "validator";

export const validate = (propName, formdata) => {

    const val = formdata.get(propName);
    const results = { };
    
    const validationChain = {
        get propertyName() { return propName},
        get results () { return results }
    };
    validationChain.required = () => {
        results.required = !validator.isEmpty(val, { ignore_whitespace: true});
        return validationChain;
    }
    validationChain.minLength = (min) => {
        results.minLength = validator.isLength(val, { min});
        return validationChain;
    };
    validationChain.isInteger = () => {
        results.isInteger = validator.isInt(val);
        return validationChain;
    }
    return validationChain;
}
