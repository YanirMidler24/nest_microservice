/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus } from './model/tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

    async getAllTasks(): Promise<Task[]> {
        const getAll = await this.taskModel.find().exec();
        return getAll
    }

    async getTasksByFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto
        let tasks = await this.getAllTasks()
        if (status) {
            tasks = tasks.filter((item) => item.status === status)
        }

        if (search) {
            tasks = tasks.filter((item) => {
                if (item.title.includes(search) || item.description.includes(search)) {
                    return item
                }
            })
        }
        return tasks;
    }

    async getTaskById(id: string): Promise<Task> {
        const allTasks = await this.getAllTasks()
        const task = allTasks.find((item) => item.taskId === id)
        if (!task) {
            throw new NotFoundException(`Task with ID = ${id} not found`)
        }
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new this.taskModel({ taskId: uuidv4(), title, description, status: TasksStatus.OPEN });
        return task.save();
    }

    async deleteTask(id: string): Promise<Task> {
        return await this.taskModel.findOneAndDelete(
            {
                taskId: id
            }
        )
    }

    async updateTaskStatus(id: string, status: TasksStatus, updateTaskStatus: UpdateTaskDto): Promise<Task> {
        const { title, description } = updateTaskStatus;
        const updateFields: { [key: string]: any } = {};
        if (title) {
            updateFields.title = title;
        }
        if (status) {
            updateFields.status = status;
        }
        if (description) {
            updateFields.description = description;
        }

        try {
            const updateTask = await this.taskModel.findOneAndUpdate(
                { taskId: id },
                { $set: updateFields },
                { new: true },
            );
            if (updateTask) {
                return updateTask;
            }
        } catch (err) {
            throw new NotFoundException(`Task with ID = ${id} not found`)
        }
    }

}

