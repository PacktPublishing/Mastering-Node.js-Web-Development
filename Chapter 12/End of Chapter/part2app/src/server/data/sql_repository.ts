import { readFileSync } from "fs";
import { Database } from "sqlite3";
import { Repository, Result } from "./repository";
import { queryAllSql, queryByNameSql, 
    insertPerson, insertCalculation, insertResult } from "./sql_queries";
import { TransactionHelper } from "./sql_helpers";

export class SqlRepository implements Repository {
    db: Database;

    constructor() {
        this.db = new Database("age.db");
        this.db.exec(readFileSync("age.sql").toString(), err => {
            if (err != undefined) throw err;
        });
    }

    async saveResult(r: Result): Promise<number> {
        return await new TransactionHelper()
            .add(insertPerson, { $name: r.name })
            .add(insertCalculation, { 
                    $age: r.age, $years: r.years, $nextage: r.nextage
            })
            .add(insertResult, {
                $name: r.name, 
                $age: r.age, $years: r.years, $nextage: r.nextage
            })
            .run(this.db);        
    }

    getAllResults($limit: number): Promise<Result[]> {
        return this.executeQuery(queryAllSql, { $limit });
    }
     
    getResultsByName($name: string, $limit: number): Promise<Result[]> {
        return this.executeQuery(queryByNameSql, { $name, $limit });
    }

    executeQuery(sql: string, params: any) : Promise<Result[]> {
        return new Promise<Result[]>((resolve, reject) => {
            this.db.all<Result>(sql, params, (err, rows) => {
                if (err == undefined) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            })
        });
    }
}
