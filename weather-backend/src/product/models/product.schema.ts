import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Company } from 'src/company/company.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop([String])
    category: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true })
    company: Company

    @Prop({ default: 0 })
    gradeCount: number;

    @Prop({ default: 0 })
    gradeSum: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);