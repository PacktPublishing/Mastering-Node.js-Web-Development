import { CatalogRepository } from "../catalog_repository";
import { BaseRepo } from "./core";
import { AddQueries } from "./queries";
import { AddStorage } from "./storage";

const RepoWithQueries = AddQueries(BaseRepo);
const CompleteRepo = AddStorage(RepoWithQueries);

export const CatalogRepoImpl = CompleteRepo;
