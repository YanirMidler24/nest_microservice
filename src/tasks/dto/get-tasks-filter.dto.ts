/* eslint-disable prettier/prettier */
import { TasksStatus } from "../model/tasks.model";
import {IsOptional, IsIn, IsNotEmpty} from 'class-validator'
export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TasksStatus.DONE, TasksStatus.IN_PROGRESS, TasksStatus.OPEN])
    status: TasksStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}