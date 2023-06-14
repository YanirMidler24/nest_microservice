/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    usernameId: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);