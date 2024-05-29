import { DataTypes, InferAttributes, InferCreationAttributes, Model, 
    Sequelize, HasManySetAssociationsMixin } 
        from "sequelize";
import { Credentials, Role } from "./auth_types";

export class CredentialsModel 
        extends Model<InferAttributes<CredentialsModel>, 
            InferCreationAttributes<CredentialsModel>> 
        implements Credentials {

    declare username: string;
    declare hashedPassword: Buffer;
    declare salt: Buffer;

    declare RoleModels?: InferAttributes<RoleModel>[];
}

export class RoleModel extends Model<InferAttributes<RoleModel>, 
        InferCreationAttributes<RoleModel>>  {
    declare name: string;

    declare CredentialsModels?: InferAttributes<CredentialsModel>[];

    declare setCredentialsModels: 
        HasManySetAssociationsMixin<CredentialsModel, string>;
} 

export const initializeAuthModels = (sequelize: Sequelize) => {
    CredentialsModel.init({
        username: { type: DataTypes.STRING, primaryKey: true },
        hashedPassword: { type: DataTypes.BLOB },
        salt: { type: DataTypes.BLOB }
    }, { sequelize });

    RoleModel.init({
        name: { type: DataTypes.STRING, primaryKey: true },
    }, {  sequelize });

    RoleModel.belongsToMany(CredentialsModel, 
        { through: "RoleMembershipJunction", foreignKey: "name" });
    CredentialsModel.belongsToMany(RoleModel, 
        { through: "RoleMembershipJunction", foreignKey: "username" });   
}
