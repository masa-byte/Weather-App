import { Product } from "../../product/models/product.model";

export interface CartState {
    products: Product[],
    quantities: number[],
}