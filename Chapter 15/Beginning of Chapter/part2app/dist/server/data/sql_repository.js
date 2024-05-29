"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlRepository = void 0;
const fs_1 = require("fs");
const sqlite3_1 = require("sqlite3");
const sql_queries_1 = require("./sql_queries");
const sql_helpers_1 = require("./sql_helpers");
class SqlRepository {
    db;
    constructor() {
        this.db = new sqlite3_1.Database("age.db");
        this.db.exec((0, fs_1.readFileSync)("age.sql").toString(), err => {
            if (err != undefined)
                throw err;
        });
    }
    async saveResult(r) {
        return await new sql_helpers_1.TransactionHelper()
            .add(sql_queries_1.insertPerson, { $name: r.name })
            .add(sql_queries_1.insertCalculation, {
            $age: r.age, $years: r.years, $nextage: r.nextage
        })
            .add(sql_queries_1.insertResult, {
            $name: r.name,
            $age: r.age, $years: r.years, $nextage: r.nextage
        })
            .run(this.db);
    }
    getAllResults($limit) {
        return this.executeQuery(sql_queries_1.queryAllSql, { $limit });
    }
    getResultsByName($name, $limit) {
        return this.executeQuery(sql_queries_1.queryByNameSql, { $name, $limit });
    }
    executeQuery(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err == undefined) {
                    resolve(rows);
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.SqlRepository = SqlRepository;
