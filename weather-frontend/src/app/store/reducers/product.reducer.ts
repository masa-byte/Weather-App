import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ProductState } from "../states/product.state";
import * as ProductActions from '../actions/product.actions';
import { Product } from "../../product/models/product.model";

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = productAdapter.getInitialState({
    selectedProductId: null,
    total: 0,
    loading: false,
    error: '',
    sortAscending: true,
    sortingCriteria: 'noCriteria',
    searchText: ''
});

export const productReducer = createReducer(
    initialState,
    on(ProductActions.addProductSuccess, (state, { product }) => {
        return {
            ...state,
            loading: false,
            error: ''
        };
    }),
    on(ProductActions.addProductFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ProductActions.deleteProductSuccess, (state, { id }) => {
        return productAdapter.removeOne(id, state);
    }),
    on(ProductActions.deleteProductFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ProductActions.updateProductSuccess, (state, { product }) => {
        return productAdapter.updateOne({ id: product.id, changes: product }, state);
    }),
    on(ProductActions.updateProductFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ProductActions.loadTotalNumberOfProductsSuccess, (state, { total }) => {
        return {
            ...state,
            total: total
        };
    }),
    on(ProductActions.loadTotalNumberOfProductsFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(ProductActions.loadProductsSuccess, (state, { product }) => {
        return productAdapter.setAll(product, {
            ...state,
            loading: false
        });
    }),
    on(ProductActions.loadProductsFailure, (state, { error }) => {
        return {
            ...state,
            loading: false,
            error: error
        };
    }),
    on(ProductActions.selectProduct, (state, { id }) => {
        return {
            ...state,
            selectedProductId: id
        };
    }),
    on(ProductActions.clearProductError, (state) => {
        return {
            ...state,
            error: ''
        };
    }),
    on(ProductActions.sortProducts, (state, { sortingCriteria, sortAscending, searchText }) => {
        return {
            ...state,
            sortingCriteria: sortingCriteria,
            sortAscending: sortAscending,
            searchText: searchText
        };
    }),
    on(ProductActions.clearProducts, (state) => {
        return productAdapter.removeAll(state);
    })
);