import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServ: TasksService) {}

  // @Get()
  // onGetTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskServ.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.taskServ.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // onGetTaskById(@Param('id') id: string): Task {
  //   return this.taskServ.getTaskById(id);
  // }

  // @Post()
  // onCreateTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   // console.log(createTaskDto);
  //   return this.taskServ.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // onRemoveTask(@Param('id') id: string): Task {
  //   return this.taskServ.removeTask(id);
  // }

  // @Patch('/:id/status')
  // onUpdateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() { status }: UpdateTaskStatusDto,
  // ): Task {
  //   return this.taskServ.updateTaskStatus(id, status);
  // }
}
