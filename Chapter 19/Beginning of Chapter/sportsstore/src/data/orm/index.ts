import { BaseRepo } from "./core";
import { AddQueries } from "./queries";
import { AddStorage } from "./storage";
import { AddOrderQueries } from "./order_queries";
import { AddOrderStorage } from "./order_storage";

const CatalogRepo = AddStorage(AddQueries(BaseRepo));
const RepoWithOrders = AddOrderStorage(AddOrderQueries(CatalogRepo));

export const CatalogRepoImpl = RepoWithOrders;
