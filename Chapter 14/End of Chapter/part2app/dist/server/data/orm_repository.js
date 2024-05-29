"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmRepository = void 0;
const sequelize_1 = require("sequelize");
const orm_helpers_1 = require("./orm_helpers");
const orm_models_1 = require("./orm_models");
class OrmRepository {
    sequelize;
    constructor() {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: "sqlite",
            storage: "orm_age.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }
    async initModelAndDatabase() {
        (0, orm_helpers_1.initializeModels)(this.sequelize);
        (0, orm_helpers_1.defineRelationships)();
        await this.sequelize.drop();
        await this.sequelize.sync();
        await (0, orm_helpers_1.addSeedData)(this.sequelize);
    }
    async saveResult(r) {
        return await this.sequelize.transaction(async (tx) => {
            const [person] = await orm_models_1.Person.findOrCreate({
                where: { name: r.name },
                transaction: tx
            });
            const [calculation] = await orm_models_1.Calculation.findOrCreate({
                where: {
                    age: r.age, years: r.years, nextage: r.nextage
                },
                transaction: tx
            });
            return (await orm_models_1.ResultModel.create({
                personId: person.id, calculationId: calculation.id
            }, { transaction: tx })).id;
        });
    }
    async getAllResults(limit) {
        return (await orm_models_1.ResultModel.findAll({
            include: [orm_models_1.Person, orm_models_1.Calculation],
            limit,
            order: [["id", "DESC"]]
        })).map(row => (0, orm_helpers_1.fromOrmModel)(row));
    }
    async getResultsByName(name, limit) {
        return (await orm_models_1.ResultModel.findAll({
            include: [orm_models_1.Person, orm_models_1.Calculation],
            where: {
                "$Person.name$": name
            },
            limit, order: [["id", "DESC"]]
        })).map(row => (0, orm_helpers_1.fromOrmModel)(row));
    }
    async getResultById(id) {
        const model = await orm_models_1.ResultModel.findByPk(id, {
            include: [orm_models_1.Person, orm_models_1.Calculation]
        });
        return model ? (0, orm_helpers_1.fromOrmModel)(model) : undefined;
    }
    async delete(id) {
        const count = await orm_models_1.ResultModel.destroy({ where: { id } });
        return count == 1;
    }
    async update(r) {
        const mod = await this.sequelize.transaction(async (transaction) => {
            const stored = await orm_models_1.ResultModel.findByPk(r.id);
            if (stored !== null) {
                const [person] = await orm_models_1.Person.findOrCreate({
                    where: { name: r.name }, transaction
                });
                const [calculation] = await orm_models_1.Calculation.findOrCreate({
                    where: {
                        age: r.age, years: r.years, nextage: r.nextage
                    }, transaction
                });
                stored.personId = person.id;
                stored.calculationId = calculation.id;
                return await stored.save({ transaction });
            }
        });
        return mod ? this.getResultById(mod.id) : undefined;
    }
}
exports.OrmRepository = OrmRepository;
