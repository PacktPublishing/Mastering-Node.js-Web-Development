import { Validator } from "./validator";
import { required, minLength } from "./basic_rules";
import { ValidationStatus } from ".";
import { CategoryModel, SupplierModel } from "../orm/models";

type ProductDTO = {
    name: string, description: string, categoryId: number, 
    supplierId: number, price: number
}

const supplierExists = async (status: ValidationStatus) => {
    const count = await SupplierModel.count({ where: { id: status.value } });
    if (count !== 1) {
        status.setInvalid(true);
        status.messages.push("A valid supplier is required");        
    }
}

const categoryExists = async (status: ValidationStatus) => {
    const count = await CategoryModel.count({ where: { id: status.value } });
    if (count !== 1) {
        status.setInvalid(true);
        status.messages.push("A valid category is required");        
    }
}

export const ProductDTOValidator = new Validator<ProductDTO>({    
    name: [required, minLength(3)],
    description: required,
    categoryId : categoryExists, 
    supplierId: supplierExists, 
    price: required,
});
