import { EntityState } from "@ngrx/entity";
import { Order } from "../../order/order.model";

export interface OrderState extends EntityState<Order> {
    selectedOrderId: string | null;
    total: number;
    loading: boolean;
    error: string | null;
}
