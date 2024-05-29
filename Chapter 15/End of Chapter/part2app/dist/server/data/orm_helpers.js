"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromOrmModel = exports.addSeedData = exports.defineRelationships = exports.initializeModels = void 0;
const sequelize_1 = require("sequelize");
const orm_models_1 = require("./orm_models");
const primaryKey = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
};
const initializeModels = (sequelize) => {
    orm_models_1.Person.init({
        ...primaryKey,
        name: { type: sequelize_1.DataTypes.STRING }
    }, { sequelize });
    orm_models_1.Calculation.init({
        ...primaryKey,
        age: { type: sequelize_1.DataTypes.INTEGER },
        years: { type: sequelize_1.DataTypes.INTEGER },
        nextage: { type: sequelize_1.DataTypes.INTEGER },
    }, { sequelize });
    orm_models_1.ResultModel.init({
        ...primaryKey,
    }, { sequelize });
};
exports.initializeModels = initializeModels;
const defineRelationships = () => {
    orm_models_1.ResultModel.belongsTo(orm_models_1.Person, { foreignKey: "personId" });
    orm_models_1.ResultModel.belongsTo(orm_models_1.Calculation, { foreignKey: "calculationId" });
};
exports.defineRelationships = defineRelationships;
const addSeedData = async (sequelize) => {
    await sequelize.query(`
        INSERT INTO Calculations 
            (id, age, years, nextage, createdAt, updatedAt) VALUES
                (1, 35, 5, 40, date(), date()), 
                (2, 35, 10, 45, date(), date())`);
    await sequelize.query(`
        INSERT INTO People (id, name, createdAt, updatedAt) VALUES
            (1, 'Alice', date(), date()), (2, "Bob", date(), date())`);
    await sequelize.query(`
        INSERT INTO ResultModels
                (calculationId, personId, createdAt, updatedAt) VALUES
            (1, 1, date(), date()), (2, 2, date(), date()), 
            (2, 1, date(), date());`);
};
exports.addSeedData = addSeedData;
const fromOrmModel = (model) => {
    return {
        id: model?.id || 0,
        name: model?.Person?.name || "",
        age: model?.Calculation?.age || 0,
        years: model?.Calculation?.years || 0,
        nextage: model?.Calculation?.nextage || 0
    };
};
exports.fromOrmModel = fromOrmModel;
