import { createReducer, on } from "@ngrx/store";
import { CartState } from "../states/cart.state";
import * as CartActions from "../actions/cart.actions";

const initialState: CartState = {
    products: [],
    quantities: [],
};


export const cartReducer = createReducer(
    initialState,
    on(CartActions.addProductToCart, (state, { product }) => {
        let products = state.products;
        let quantities = state.quantities;
        let index = products.findIndex(p => p.id === product.id);
        if (index === -1) {
            products = [...products, product];
            quantities = [...quantities, 1];
        }

        return {
            ...state,
            products: products,
            quantities: quantities,
        };
    }),
    on(CartActions.removeProductFromCart, (state, { productId }) => {
        let products = state.products;
        let quantities = state.quantities;
        let index = products.findIndex(p => p.id === productId);
        products = products.filter((p) => p.id !== productId);
        quantities = quantities.filter((q, i) => i !== index);
        return {
            ...state,
            products: products,
            quantities: quantities,
        };
    }),
    on(CartActions.updateQuantity, (state, { productId, quantity }) => {
        let quantities = state.quantities;
        let index = state.products.findIndex(p => p.id === productId);
        quantities = quantities.map((q, i) => i === index ? quantity : q);
        return {
            ...state,
            quantities: quantities,
        };
    }),
    on(CartActions.clearCart, (state) => ({
        ...state,
        products: [],
        quantities: [],
    })),
);
