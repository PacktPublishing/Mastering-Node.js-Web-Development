import { BaseRepo } from "./core";
import { AddQueries } from "./queries";
import { AddStorage } from "./storage";
import { AddOrderQueries } from "./order_queries";
import { AddOrderStorage } from "./order_storage";
import { AddCustomers } from "./customers";

const CatalogRepo = AddStorage(AddQueries(BaseRepo));
const RepoWithOrders = AddOrderStorage(AddOrderQueries(CatalogRepo));
const RepoWithCustomers = AddCustomers(RepoWithOrders);

export const CatalogRepoImpl = RepoWithCustomers;
