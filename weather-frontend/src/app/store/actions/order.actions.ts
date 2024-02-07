import { createAction, props } from "@ngrx/store";
import { Order } from "../../order/order.model";

export const addOrder = createAction(
    '[Order] Add Order',
    props<{ order: Order }>()
);

export const loadTotalNumberOfOrders = createAction(
    '[Order] Load Total Number Of Orders'
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
    props<{ pageIndex: number, pageSize: number }>()
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