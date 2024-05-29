import { Product } from "./catalog_models";
import { Customer } from "./customer_models";

export interface Order {
    id?: number;

    customer?: Customer;
    selections?: ProductSelection[];
    address?: Address;

    shipped: boolean;
}

export interface ProductSelection {
    id?: number;
    productId?: number;
    quantity: number;
    price: number;
}

export interface Address {
    id?: number;
    street: string;
    city: string;
    state: string;
    zip: string;
}
