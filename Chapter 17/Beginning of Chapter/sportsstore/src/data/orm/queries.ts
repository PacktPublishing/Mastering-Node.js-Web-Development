import { CategoryModel, ProductModel, SupplierModel } from "./models";
import { BaseRepo, Constructor } from "./core"

export function AddQueries<TBase extends Constructor<BaseRepo>>(Base: TBase) {
    return class extends Base {

        getProducts() {
            return ProductModel.findAll({
                include: [
                    {model: SupplierModel, as: "supplier" },
                    {model: CategoryModel, as: "category"}],
                raw: true, nest: true
            });
        }
    
        getCategories() {
            return CategoryModel.findAll({
                raw: true, nest: true
            })
        }
    
        getSuppliers() {
            return SupplierModel.findAll({
                raw: true, nest:true
            });
        }        
    }
}
