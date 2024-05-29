export interface WebServiceValidation  {
    keyValidator?: ValidationRule;
    getMany?: ValidationRequirements;
    store?: ValidationRequirements;
    replace?: ValidationRequirements;
    modify?: ValidationRequirements;
}

export type ValidationRequirements = {
    [key: string] : ValidationRule
}

export type ValidationRule = 
    ((value: any) => boolean)[] |
    { 
        required? : boolean,
        validation: ((value: any) => boolean)[],
        converter?: (value: any) => any,
    }

export class ValidationError implements Error {
    constructor(public name: string, public message: string) {}
    stack?: string | undefined;
    cause?: unknown;
}

export type ModelValidation = {
    modelRule?: ValidationRule,
    propertyRules?: ValidationRequirements
}
