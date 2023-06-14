/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    taskId: string;

    @Prop()
    title: string;

    @Prop()
    status: string;

    @Prop()
    description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);