"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRepository = void 0;
const crypto_1 = require("crypto");
class MemoryRepository {
    store = new Map();
    async createSession() {
        return { id: (0, crypto_1.randomUUID)(), data: {} };
    }
    async getSession(id) {
        const wrapper = this.store.get(id);
        if (wrapper && wrapper.expires > new Date(Date.now())) {
            return structuredClone(wrapper.session);
        }
    }
    async saveSession(session, expires) {
        this.store.set(session.id, { session, expires });
    }
    async touchSession(session, expires) {
        const wrapper = this.store.get(session.id);
        if (wrapper) {
            wrapper.expires = expires;
        }
    }
}
exports.MemoryRepository = MemoryRepository;
