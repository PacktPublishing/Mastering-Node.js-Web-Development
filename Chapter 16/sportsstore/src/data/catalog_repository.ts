import { Category, Product, Supplier } from "./catalog_models";

export interface CatalogRepository {

    getProducts(): Promise<Product[]>;

    storeProduct(p: Product): Promise<Product>;

    getCategories() : Promise<Category[]>;

    storeCategory(c: Category): Promise<Category>;

    getSuppliers(): Promise<Supplier[]>;

    storeSupplier(s: Supplier): Promise<Supplier>;
}
