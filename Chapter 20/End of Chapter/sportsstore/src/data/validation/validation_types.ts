export class ValidationStatus {
    private invalid: boolean = false;

    constructor(public readonly value: any) {}

    get isInvalid() : boolean  {
        return this.invalid
    }

    setInvalid(newValue: boolean) {
        this.invalid = newValue || this.invalid;
    }
    
    messages: string[] = [];
}

export type ValidationRule = (status: ValidationStatus) 
    => void | Promise<void>;

export type ValidationRuleSet<T> = {
    [key in keyof Omit<Required<T>, "id">]: ValidationRule | ValidationRule[];
}

export type ValidationResults<T> = {
    [key in keyof Omit<Required<T>, "id">]: ValidationStatus;
}
