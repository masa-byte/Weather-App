import { createAction, props } from "@ngrx/store";
import { Product } from "../../product/models/product.model";

export const getProduct = createAction('[Product] Get Product', props<{ id: string }>());

export const addProduct = createAction('[Product] Add Product', props<{ product: Product }>());

export const addProductSuccess = createAction('[Product] Add Product Success', props<{ product: Product }>());

export const addProductFailure = createAction('[Product] Add Product Failure', props<{ error: string }>());

export const deleteProduct = createAction(
    '[Product] Delete Product',
    props<{ id: string }>()
);

export const deleteProductSuccess = createAction('[Product] Delete Product Success', props<{ id: string }>());

export const deleteProductFailure = createAction('[Product] Delete Product Failure', props<{ error: string }>());

export const updateProduct = createAction('[Product] Update Product', props<{ product: Product }>());

export const updateProductSuccess = createAction('[Product] Update Product Success', props<{ product: Product }>());

export const updateProductFailure = createAction('[Product] Update Product Failure', props<{ error: string }>());

export const loadProductsByPageIndexPageSize = createAction(
    '[Product] Load Products',
    props<{ pageIndex: number, pageSize: number, companyId: string }>()
);

export const loadTotalNumberOfProducts = createAction(
    '[Product] Load Total Number Of Products',
    props<{ companyId: string }>()
);

export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ product: Product[] }>());

export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: string }>());

export const loadTotalNumberOfProductsSuccess = createAction(
    '[Product] Load Total Number Of Products Success',
    props<{ total: number }>()
);

export const loadTotalNumberOfProductsFailure = createAction('[Product] Load Total Number Of Products Failure', props<{ error: string }>());

export const selectProduct = createAction('[Product] Select Product', props<{ id: string }>());

export const clearProductError = createAction('[Product] Clear Error');

export const sortProducts = createAction(
    '[Product] Sort Products',
    props<{ sortingCriteria: string; sortAscending: boolean, searchText: string }>()
);

export const clearProducts = createAction('[Product] Clear Products');