/* eslint-disable prettier/prettier */
import { NotFoundException, PipeTransform, } from "@nestjs/common";
import { TasksStatus } from "../model/tasks.model";

export class TasksStatusValidationPipe implements PipeTransform {
    readonly allowedStatues = [
        TasksStatus.OPEN,
        TasksStatus.DONE,
        TasksStatus.IN_PROGRESS
    ];
    transform(value: any) {
        console.log(value);
        value = value.toUpperCase()
        if (!this.isStatusValid(value)) {
            throw new NotFoundException(`${value} not valid Status`)
        }
        return value
    }

    private isStatusValid(status: any) {
        const inx = this.allowedStatues.indexOf(status)
        return inx !== -1
    }
}
