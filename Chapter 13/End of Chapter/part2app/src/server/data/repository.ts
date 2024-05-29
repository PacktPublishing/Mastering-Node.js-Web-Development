export interface Result {
    id: number,
    name: string,
    age: number, 
    years: number, 
    nextage: number
}

export interface Repository {

    saveResult(r: Result):  Promise<number>;

    getAllResults(limit: number) : Promise<Result[]>;

    getResultsByName(name: string, limit: number): Promise<Result[]>;
}
