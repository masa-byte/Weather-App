import { createAction, props } from "@ngrx/store";
import { Product } from "../../product/models/product.model";

export const addProductToCart = createAction(
    '[Cart] Add Product To Cart',
    props<{ product: Product }>()
);

export const removeProductFromCart = createAction(
    '[Cart] Remove Product From Cart',
    props<{ productId: string }>()
);

export const updateQuantity = createAction(
    '[Cart] Update Quantity',
    props<{ productId: string, quantity: number }>()
);

export const clearCart = createAction(
    '[Cart] Clear Cart'
);
