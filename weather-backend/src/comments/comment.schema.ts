import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class CommentEntity {
    @Prop()
    text: string;
    @Prop()
    username: string;
    @Prop()
    createdAt: string;
    @Prop()
    replies: CommentEntity[];
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);