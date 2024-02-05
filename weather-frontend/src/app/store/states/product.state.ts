import { EntityState } from "@ngrx/entity";
import { Product } from "../../product/models/product.model";


export interface ProductState extends EntityState<Product> {
    selectedProductId: string | null;
    total: number;
    loading: boolean;
    error: string | null;
    sortAscending: boolean;
    sortingCriteria: string;
    selectedCategories: string[];
    searchText: string;
}
