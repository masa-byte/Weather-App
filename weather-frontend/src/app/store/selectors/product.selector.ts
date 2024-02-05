import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "../states/product.state";
import { productAdapter } from "../reducers/product.reducer";

export const selectProductState = createFeatureSelector<ProductState>('products');

export const {
    selectAll: selectAllProduct,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
} = productAdapter.getSelectors(selectProductState);

export const selectSelectedProductId = createSelector(
    selectProductState,
    (state) => state.selectedProductId
);

export const selectTotalNumberOfProducts = createSelector(
    selectProductState,
    (state) => state.total
);


export const selectProductLoading = createSelector(
    selectProductState,
    (state) => state.loading
);

export const selectProductError = createSelector(
    selectProductState,
    (state) => state.error
);

export const selectSelectedProduct = createSelector(
    selectProductEntities,
    selectSelectedProductId,
    (productEntities, selectedProductId) => productEntities[selectedProductId!]
);

export const selectSortingCriteria = createSelector(
    selectProductState,
    (state) => state.sortingCriteria
);

export const selectSortAscending = createSelector(
    selectProductState,
    (state) => state.sortAscending
);

export const selectSearchText = createSelector(
    selectProductState,
    (state) => state.searchText
);

export const selectFilteredProducts = createSelector(
    selectProductEntities,
    selectSortingCriteria,
    selectSortAscending,
    selectSearchText,
    (entities, sorting, ascending, searchText) => {
        let arrayOfProducts = Object.values(entities!);

        if (searchText !== '') 
            arrayOfProducts = arrayOfProducts.filter((product: any) => product.name.toLowerCase().includes(searchText.toLowerCase()));

        if (sorting === 'noCriteria')
            return arrayOfProducts;

        return arrayOfProducts.sort((a: any, b: any) => {
            if (ascending)
                return a[sorting] - b[sorting];
            else
                return b[sorting] - a[sorting];
        });
    }
);