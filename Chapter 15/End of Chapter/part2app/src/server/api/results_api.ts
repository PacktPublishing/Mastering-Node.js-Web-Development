import { WebService } from "./http_adapter";
import { Result } from "../data/repository";
import repository from "../data";
import * as jsonpatch from "fast-json-patch";
import { validateModel } from "./validation_functions";
import { ResultModelValidation } from "./results_api_validation";

export class ResultWebService implements WebService<Result> {

    getOne(id: any): Promise<Result | undefined> {
        return repository.getResultById(id);
    }

    getMany(query: any): Promise<Result[]> {
        if (query.name) {
            return repository.getResultsByName(query.name, 10);
        } else {
            return repository.getAllResults(10);
        }
    }

    async store(data: any): Promise<Result | undefined> {
        const { name, age, years} = data;
        const nextage = age + years; 
        const id = await repository.saveResult({ id: 0, name, age, 
            years, nextage});
        return await repository.getResultById(id);        
    }

    delete(id: any): Promise<boolean> {
        return repository.delete(Number.parseInt(id));
    }

    replace(id: any, data: any): Promise<Result | undefined> {
        const { name, age, years, nextage } = data;
        const validated = validateModel({ name, age, years, nextage }, 
            ResultModelValidation)
        return repository.update({ id, ...validated });
    }

    async modify(id: any, data: any): Promise<Result | undefined> {
        const dbData = await this.getOne(id);
        if (dbData !== undefined) {
            return await this.replace(id, 
                jsonpatch.applyPatch(dbData, data).newDocument);
        }
    }
}
