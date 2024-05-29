"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeathersWrapper = void 0;
class FeathersWrapper {
    ws;
    constructor(ws) {
        this.ws = ws;
    }
    get(id) {
        return this.ws.getOne(id);
    }
    find(params) {
        return this.ws.getMany(params.query);
    }
    create(data, params) {
        return this.ws.store(data);
    }
    remove(id, params) {
        return this.ws.delete(id);
    }
    update(id, data, params) {
        return this.ws.replace(id, data);
    }
    patch(id, data, params) {
        return this.ws.modify(id, data);
    }
}
exports.FeathersWrapper = FeathersWrapper;
