"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionHelper = void 0;
class TransactionHelper {
    steps = [];
    add(sql, params) {
        this.steps.push([sql, params]);
        return this;
    }
    run(db) {
        return new Promise((resolve, reject) => {
            let index = 0;
            let lastRow = NaN;
            const cb = (err, rowID) => {
                if (err) {
                    db.run("ROLLBACK", () => reject());
                }
                else {
                    lastRow = rowID ? rowID : lastRow;
                    if (++index === this.steps.length) {
                        db.run("COMMIT", () => resolve(lastRow));
                    }
                    else {
                        this.runStep(index, db, cb);
                    }
                }
            };
            db.run("BEGIN", () => this.runStep(0, db, cb));
        });
    }
    runStep(idx, db, cb) {
        const [sql, params] = this.steps[idx];
        db.run(sql, params, function (err) {
            cb(err, this.lastID);
        });
    }
}
exports.TransactionHelper = TransactionHelper;
