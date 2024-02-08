import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/company/company.schema';
import { Product } from 'src/product/models/product.schema';
import { User } from 'src/user/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {

    _id: string;

    @Prop({ required: true })
    totalPrice: number;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product', required: true })
    products: Product[]

    @Prop({ required: true })
    quantities: number[];

    @Prop({ required: true })
    orderDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User

    @Prop({ required: true })
    reviewed: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);