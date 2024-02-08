import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import * as OrderActions from "../actions/order.actions";
import { Order } from "../../order/order.model";
import { OrderService } from "../../order/order.service";


@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
    ) { }

    addOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.addOrder),
            switchMap(({ order }) =>
                this.orderService.addOrder(order).pipe(
                    map((response) => {
                        let body = response.body;
                        const { _id, ...orderWithout_Id } = body;
                        order = orderWithout_Id as Order;
                        order.id = _id;

                        return OrderActions.addOrderSuccess({ order });
                    }),
                    catchError((error) => {
                        return of(OrderActions.addOrderFailure({ error: 'Failed to add order' }));
                    })
                )
            )
        ));

    loadTotalNumberOfOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadTotalNumberOfOrders),
            switchMap(({ userId }) =>
                this.orderService.getTotalNumberOfOrders(userId).pipe(
                    map((response) => {
                        let total = response.body as number;
                        return OrderActions.loadTotalNumberOfOrdersSuccess({ total });
                    }),
                    catchError((error) => {
                        return of(OrderActions.loadTotalNumberOfOrdersFailure({ error: 'Failed to get total number of orders' }));
                    })
                )
            )
        ));

    loadOrdersByPageIndexPageSize$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.loadOrdersByPageIndexPageSize),
            switchMap(({ pageIndex, pageSize, userId }) =>
                this.orderService.getOrdersByPageIndexPageSize(pageIndex, pageSize, userId).pipe(
                    map((response) => {
                        let body = response.body;
                        let allOrders: Order[] = body.map((order: any) => {
                            order.id = order._id;
                            const { _id, ...orderWithout_Id } = order;
                            return orderWithout_Id as Order;
                        });
                        
                        return OrderActions.loadOrdersByPageIndexPageSizeSuccess({ orders: allOrders});
                    }),
                    catchError((error) => {
                        return of(OrderActions.loadOrdersByPageIndexPageSizeFailure({ error: 'Failed to get orders' }));
                    })
                )
            )
        ));

    rateOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(OrderActions.rateOrder),
            switchMap(({ orderId, ratings }) =>
                this.orderService.rateOrder(orderId, ratings).pipe(
                    map((response) => {
                        let body = response.body;
                        const { _id, ...orderWithout_Id } = body;
                        let order = orderWithout_Id as Order;
                        order.id = _id;

                        return OrderActions.rateOrderSuccess({ order });
                    }),
                    catchError((error) => {
                        return of(OrderActions.rateOrderFailure({ error: 'Failed to rate order' }));
                    })
                )
            )
        ));

}