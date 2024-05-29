"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const validation_functions_1 = require("./validation_functions");
class Validator {
    ws;
    validation;
    constructor(ws, validation) {
        this.ws = ws;
        this.validation = validation;
    }
    getOne(id) {
        return this.ws.getOne(this.validateId(id));
    }
    getMany(query) {
        if (this.validation.getMany) {
            query = (0, validation_functions_1.validate)(query, this.validation.getMany);
        }
        return this.ws.getMany(query);
    }
    store(data) {
        if (this.validation.store) {
            data = (0, validation_functions_1.validate)(data, this.validation.store);
        }
        return this.ws.store(data);
    }
    delete(id) {
        return this.ws.delete(this.validateId(id));
    }
    replace(id, data) {
        if (this.validation.replace) {
            data = (0, validation_functions_1.validate)(data, this.validation.replace);
        }
        return this.ws.replace(this.validateId(id), data);
    }
    modify(id, data) {
        if (this.validation.modify) {
            data = (0, validation_functions_1.validate)(data, this.validation.modify);
        }
        return this.ws.modify(this.validateId(id), data);
    }
    validateId(val) {
        return (0, validation_functions_1.validateIdProperty)(val, this.validation);
    }
}
exports.Validator = Validator;
