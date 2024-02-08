import { createAction, props } from "@ngrx/store";
import { Order } from "../../order/order.model";

export const addOrder = createAction(
    '[Order] Add Order',
    props<{ order: Order }>()
);

export const addOrderSuccess = createAction(
    '[Order] Add Order Success',
    props<{ order: Order }>()
);

export const addOrderFailure = createAction(
    '[Order] Add Order Failure',
    props<{ error: string }>()
);

export const loadTotalNumberOfOrders = createAction(
    '[Order] Load Total Number Of Orders',
    props<{ userId: string }>()
);

export const loadTotalNumberOfOrdersSuccess = createAction(
    '[Order] Load Total Number Of Orders Success',
    props<{ total: number }>()
);

export const loadTotalNumberOfOrdersFailure = createAction(
    '[Order] Load Total Number Of Orders Failure',
    props<{ error: string }>()
);

export const loadOrdersByPageIndexPageSize = createAction(
    '[Order] Load Orders By Page Index Page Size',
    props<{ pageIndex: number, pageSize: number, userId: string }>()
);

export const loadOrdersByPageIndexPageSizeSuccess = createAction(
    '[Order] Load Orders By Page Index Page Size Success',
    props<{ orders: Order[] }>()
);

export const loadOrdersByPageIndexPageSizeFailure = createAction(
    '[Order] Load Orders By Page Index Page Size Failure',
    props<{ error: string }>()
);

export const rateOrder = createAction(
    '[Order] Rate Order',
    props<{ orderId: string, ratings: number[] }>()
);

export const rateOrderSuccess = createAction(
    '[Order] Rate Order Success',
    props<{ order: Order }>()
);

export const rateOrderFailure = createAction(
    '[Order] Rate Order Failure',
    props<{ error: string }>()
);
