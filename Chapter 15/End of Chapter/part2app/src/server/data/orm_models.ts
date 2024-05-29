import { Model, CreationOptional, ForeignKey, InferAttributes, 
    InferCreationAttributes  } from "sequelize";

export class Person extends Model<InferAttributes<Person>,
        InferCreationAttributes<Person>> {

    declare id?: CreationOptional<number>;
    declare name: string
}

export class Calculation extends Model<InferAttributes<Calculation>,
        InferCreationAttributes<Calculation>> {

    declare id?: CreationOptional<number>;            
    declare age: number;
    declare years: number;
    declare nextage: number;
}

export class ResultModel extends Model<InferAttributes<ResultModel>, 
        InferCreationAttributes<ResultModel>> {

    declare id: CreationOptional<number>;           
    declare personId: ForeignKey<Person["id"]>;
    declare calculationId: ForeignKey<Calculation["id"]>;

    declare Person?: InferAttributes<Person>;
    declare Calculation?: InferAttributes<Calculation>;
}
