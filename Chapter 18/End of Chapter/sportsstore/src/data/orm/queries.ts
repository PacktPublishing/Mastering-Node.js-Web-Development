import { CategoryModel, ProductModel, SupplierModel } from "./models";
import { BaseRepo, Constructor } from "./core"
import { ProductQueryParameters } from "../catalog_models";
import { Op } from "sequelize";

export function AddQueries<TBase extends Constructor<BaseRepo>>(Base: TBase) {
    return class extends Base {
    
        async getProducts(params?: ProductQueryParameters) {
            const opts: any = {};
            if (params?.page && params.pageSize) {
                opts.limit = params?.pageSize,
                opts.offset = (params.page -1) * params.pageSize                
            }
            if(params?.searchTerm) {
                const searchOp = { [Op.like]: "%" + params.searchTerm + "%"};
                opts.where = {
                    [Op.or]: { name: searchOp, description: searchOp }
                }
            }
            if (params?.category) {
                opts.where = { 
                    ...opts.where,  categoryId: params.category
                }
            }
            const result = await ProductModel.findAndCountAll({                
                include: [
                    {model: SupplierModel, as: "supplier" },
                    {model: CategoryModel, as: "category"}],
                raw: true, nest: true,
                ...opts
            });               
            const categories = await this.getCategories();
            return { products: result.rows, totalCount: result.count, categories };
        }

        getCategories() {
            return CategoryModel.findAll({raw: true, nest: true})
        }
    
        getSuppliers() {
            return SupplierModel.findAll({raw: true, nest: true});
        }        

        getProductDetails(ids: number[]) {
            return ProductModel.findAll({
                where: { id: { [Op.in]: ids }}, raw: true, nest: true, 
            });
        }
    }
}
