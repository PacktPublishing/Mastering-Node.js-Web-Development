"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { SqlRepository } from "./sql_repository";
const orm_repository_1 = require("./orm_repository");
const repository = new orm_repository_1.OrmRepository();
exports.default = repository;
