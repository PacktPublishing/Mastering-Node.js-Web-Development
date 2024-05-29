import validator from "validator";
import { ValidationStatus } from "./validation_types";

export const minLength = (min: number) => (status: ValidationStatus) => {
    if (!validator.isLength(status.value, { min })) {
        status.setInvalid(true);
        status.messages.push(`Enter at least ${min} characters`);
    } 
};

export const email = (status: ValidationStatus) => {
    if (!validator.isEmail(status.value)) {
        status.setInvalid(true);
        status.messages.push("Enter an email address");
    }
};

export const required = (status: ValidationStatus) => {
    if (validator.isEmpty(status.value.toString(), { ignore_whitespace: true})) {
        status.setInvalid(true);
        status.messages.push("A value is required");
    }
};

export const no_op = (status: ValidationStatus) => { /* do nothing */ }
