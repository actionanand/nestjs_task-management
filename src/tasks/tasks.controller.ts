import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServ: TasksService) {}

  @Get()
  onGetAllTasks(): Task[] {
    return this.taskServ.getAllTasks();
  }

  @Post()
  onCreateTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.taskServ.createTask(createTaskDto);
  }
}
