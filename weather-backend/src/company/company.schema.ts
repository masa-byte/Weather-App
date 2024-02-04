import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {

    _id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    location: string;

    @Prop()
    yearFounded: number;

    @Prop()
    description: string;

    @Prop()
    employees: number;

    @Prop()
    type: string;

    async setPassword(password: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.password = hashedPassword;
    }

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

export const CompanySchema = SchemaFactory.createForClass(Company);