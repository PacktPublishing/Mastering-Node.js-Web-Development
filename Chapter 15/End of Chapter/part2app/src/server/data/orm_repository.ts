import { Sequelize } from "sequelize";
import { ApiRepository, Result } from "./repository";
import { addSeedData, defineRelationships, 
    fromOrmModel, initializeModels } from "./orm_helpers";
import { Calculation, Person, ResultModel } from "./orm_models";

export class OrmRepository implements ApiRepository {
    sequelize: Sequelize;

    constructor() {
        this.sequelize = new Sequelize({
            dialect: "sqlite",
            storage: "orm_age.db",
            logging: console.log,
            logQueryParameters: true
        });
        this.initModelAndDatabase();
    }

    async initModelAndDatabase() : Promise<void> {
        initializeModels(this.sequelize);
        defineRelationships();
        await this.sequelize.drop();        
        await this.sequelize.sync();
        await addSeedData(this.sequelize);
    }

    async saveResult(r: Result): Promise<number> {
        return await this.sequelize.transaction(async (tx) => {
    
            const [person] = await Person.findOrCreate({
                where: { name : r.name},
                transaction: tx
            });
            
            const [calculation] = await Calculation.findOrCreate({
                where: {
                    age: r.age, years: r.years, nextage: r.nextage
                },
                transaction: tx
            });
    
            return (await ResultModel.create({ 
                personId: person.id, calculationId: calculation.id}, 
            {transaction: tx})).id;
        });        
    }
    
    async getAllResults(limit: number): Promise<Result[]> {
        return (await ResultModel.findAll({
            include: [Person, Calculation],
            limit,
            order: [["id", "DESC"]]            
        })).map(row => fromOrmModel(row));
    }
    
    async getResultsByName(name: string, limit: number): Promise<Result[]> {
        return (await ResultModel.findAll({
            include: [Person, Calculation],
            where: {
                "$Person.name$": name
            }, 
            limit, order: [["id", "DESC"]]
        })).map(row => fromOrmModel(row));        
    }    

    async getResultById(id: number): Promise<Result | undefined> {
        const model = await ResultModel.findByPk(id, {
            include: [Person, Calculation ]
        });
        return model ? fromOrmModel(model): undefined;
    }

    async delete(id: number): Promise<boolean> {
        const count = await ResultModel.destroy({ where: { id }});
        return count == 1;
    }

    async update(r: Result) : Promise<Result | undefined > {
        const mod = await this.sequelize.transaction(async (transaction) => {
            const stored = await ResultModel.findByPk(r.id);
            if (stored !== null) {
                const [person] = await Person.findOrCreate({
                    where: { name : r.name}, transaction
                });                
                const [calculation] = await Calculation.findOrCreate({
                    where: {
                        age: r.age, years: r.years, nextage: r.nextage
                    }, transaction
                });
                stored.personId = person.id;
                stored.calculationId = calculation.id;
                return await stored.save({transaction});
            }
        });
        return mod ? this.getResultById(mod.id) : undefined;
    }
}
