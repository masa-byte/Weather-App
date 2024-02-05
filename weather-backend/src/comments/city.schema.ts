import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { CommentEntity } from "./comment.schema";

export type CityDocument = HydratedDocument<CityEntity>;

@Schema()
export class CityEntity {
    @Prop()
    name: string;
    @Prop({ type: [{ type: CommentEntity }] })
    comments: CommentEntity[];
}

export const CitySchema = SchemaFactory.createForClass(CityEntity);