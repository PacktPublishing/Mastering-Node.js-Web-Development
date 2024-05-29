import { Sequelize } from "sequelize";
import { getConfig } from "../../config";
import { initializeModels, CategoryModel, ProductModel, SupplierModel } 
    from "./models";
import { readFileSync } from "fs";

const config = getConfig("catalog:orm_repo");
const logging = config.logging 
        ? { logging: console.log, logQueryParameters: true}
        : { logging: false };

export class BaseRepo {
    sequelize: Sequelize; 
    
    constructor() {
        this.sequelize = new Sequelize({ ...config.settings, ...logging })
        this.initModelsAndDatabase();
    }

    async initModelsAndDatabase() : Promise<void> {
        initializeModels(this.sequelize);
        if (config.reset_db) {
            await this.sequelize.drop();
            await this.sequelize.sync();
            await this.addSeedData();
        } else {
            await this.sequelize.sync();            
        }
    }    

    async addSeedData() {
        const data = JSON.parse(readFileSync(config.seed_file).toString());
        await this.sequelize.transaction(async (transaction) => {
            await SupplierModel.bulkCreate(data.suppliers, { transaction });
            await CategoryModel.bulkCreate(data.categories, { transaction });
            await ProductModel.bulkCreate(data.products, { transaction });
        });
    }    
}

export type Constructor<T = {}> = new (...args: any[]) => T;
