import { CatalogRepository } from "./catalog_repository";
import { CatalogRepoImpl} from "./orm";

export const catalog_repository: CatalogRepository = new CatalogRepoImpl();
