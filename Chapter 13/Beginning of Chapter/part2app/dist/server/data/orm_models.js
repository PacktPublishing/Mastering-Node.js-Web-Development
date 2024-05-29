"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultModel = exports.Calculation = exports.Person = void 0;
const sequelize_1 = require("sequelize");
class Person extends sequelize_1.Model {
}
exports.Person = Person;
class Calculation extends sequelize_1.Model {
}
exports.Calculation = Calculation;
class ResultModel extends sequelize_1.Model {
}
exports.ResultModel = ResultModel;
