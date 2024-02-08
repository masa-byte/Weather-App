import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderState } from "../states/order.state";
import { orderAdapter } from "../reducers/order.reducer";

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export const {
    selectAll: selectAllOrder,
    selectEntities: selectOrderEntities,
    selectIds: selectOrderIds,
} = orderAdapter.getSelectors(selectOrderState);

export const selectSelectedOrderId = createSelector(
    selectOrderState,
    (state) => state.selectedOrderId
);

export const selectTotalNumberOfOrders = createSelector(
    selectOrderState,
    (state) => state.total
);

export const selectOrderLoading = createSelector(
    selectOrderState,
    (state) => state.loading
);

export const selectOrderError = createSelector(
    selectOrderState,
    (state) => state.error
);

export const selectSelectedOrder = createSelector(
    selectOrderEntities,
    selectSelectedOrderId,
    (orderEntities, selectedOrderId) => orderEntities[selectedOrderId!]
);
