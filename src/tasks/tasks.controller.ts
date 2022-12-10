import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServ: TasksService) {}

  @Get()
  onGetAllTasks(): Task[] {
    return this.taskServ.getAllTasks();
  }

  @Get('/:id')
  onGetTaskById(@Param('id') id: string) {
    return this.taskServ.getTaskById(id);
  }

  @Post()
  onCreateTask(@Body() createTaskDto: CreateTaskDto): Task {
    // console.log(createTaskDto);
    return this.taskServ.createTask(createTaskDto);
  }

  @Delete('/:id')
  onRemoveTask(@Param('id') id: string) {
    return this.taskServ.removeTask(id);
  }

  @Patch('/:id/status')
  onUpdateTaskStatus(
    @Param('id') id: string,
    @Body('status') taskStatus: TaskStatus,
  ) {
    return this.taskServ.updateTaskStatus(id, taskStatus);
  }
}
