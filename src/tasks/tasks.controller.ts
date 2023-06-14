/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksStatus } from './model/tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './schemas/task.schema';


@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }

  @Get()
  async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksByFilter(filterDto);
    } else {
      return await this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TasksStatusValidationPipe) status: TasksStatus,
    @Body() updateTaskStatus: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, status, updateTaskStatus);
  }
}