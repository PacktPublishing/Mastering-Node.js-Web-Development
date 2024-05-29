import { WebService } from "./http_adapter";
import { validate, validateIdProperty } from "./validation_functions";
import { WebServiceValidation } from "./validation_types";

export class Validator<T> implements WebService<T> {

    constructor(private ws: WebService<T>, 
        private validation: WebServiceValidation) {}

    getOne(id: any): Promise<T | undefined> {
        return this.ws.getOne(this.validateId(id));
    }

    getMany(query: any): Promise<T[]> {
        if (this.validation.getMany) {
            query = validate(query, this.validation.getMany);
        }
        return this.ws.getMany(query);
    }

    store(data: any): Promise<T | undefined> {
        if (this.validation.store) {
            data = validate(data, this.validation.store);
        }
        return this.ws.store(data);
    }

    delete(id: any): Promise<boolean> {
        return this.ws.delete(this.validateId(id));
    }

    replace(id: any, data: any): Promise<T | undefined> {
        if (this.validation.replace) {
            data = validate(data, this.validation.replace);
        }
        return this.ws.replace(this.validateId(id), data);
    }

    modify(id: any, data: any): Promise<T | undefined> {
        if (this.validation.modify) {
            data = validate(data, this.validation.modify);
        }
        return this.ws.modify(this.validateId(id), data);
    }

    validateId(val: any) {
        return validateIdProperty(val, this.validation);
    }
}
