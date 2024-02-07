
export interface Order {
    id: string;
    user: any;
    products: any[];
    quantities: number[];
    totalPrice: number;
    orderDate: Date;
    reviewed: boolean;
}