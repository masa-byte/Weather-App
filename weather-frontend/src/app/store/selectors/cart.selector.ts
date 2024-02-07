import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../states/cart.state";

export const selectCartInfo = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
    selectCartInfo,
    (state: CartState) => state.products
);

export const selectCartQuantities = createSelector(
    selectCartInfo,
    (state: CartState) => state.quantities
);

export const selectCartTotal = createSelector(
    selectCartInfo,
    (state: CartState) => state.products.length
);

export const selectCartProduct = createSelector(
    selectCartInfo,
    (state: CartState, props: { productId: string }) => {
        let index = state.products.findIndex(p => p.id === props.productId);
        return index === -1 ? null : state.products[index];
    }
);