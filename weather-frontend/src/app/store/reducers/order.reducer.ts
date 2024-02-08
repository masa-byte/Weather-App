import { OrderState } from "../states/order.state";
import * as OrderActions from "../actions/order.actions";
import { createReducer, on } from "@ngrx/store";
import { Order } from "../../order/order.model";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export const orderAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

const initialState: OrderState = orderAdapter.getInitialState({
    ids: [],
    entities: {},
    selectedOrderId: null,
    total: 0,
    loading: false,
    error: null,
});

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.addOrderSuccess, (state, { order }) => {
        return orderAdapter.addOne(order, {
            ...state,
            loading: false,
            error: null
        });
    }),
    on(OrderActions.addOrderFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(OrderActions.loadTotalNumberOfOrdersSuccess, (state, { total }) => {
        return {
            ...state,
            total: total
        };
    }),
    on(OrderActions.loadTotalNumberOfOrdersFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(OrderActions.loadOrdersByPageIndexPageSizeSuccess, (state, { orders }) => {
        return orderAdapter.setAll(orders, {
            ...state,
            loading: false
        });
    }),
    on(OrderActions.loadOrdersByPageIndexPageSizeFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(OrderActions.rateOrderFailure, (state, { error }) => {
        return {
            ...state,
            error: error
        };
    }),
    on(OrderActions.rateOrderSuccess, (state, { order }) => {
        return orderAdapter.removeOne(order.id, state);
    })
);