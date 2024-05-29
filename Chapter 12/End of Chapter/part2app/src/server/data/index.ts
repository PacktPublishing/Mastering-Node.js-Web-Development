import { Repository } from "./repository";
//import { SqlRepository } from "./sql_repository";
import { OrmRepository } from "./orm_repository";

const repository: Repository = new OrmRepository();
export default repository;
