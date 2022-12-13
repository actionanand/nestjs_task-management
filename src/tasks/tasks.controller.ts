import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskDelResp } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly taskServ: TasksService) {}

  @Get()
  onGetTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskServ.getTasks(filterDto);
  }

  @Get('/:id')
  onGetTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskServ.getTaskById(id);
  }

  @Post()
  onCreateTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    // console.log(createTaskDto);
    return this.taskServ.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  onRemoveTask(@Param('id') id: string): Promise<TaskDelResp> {
    return this.taskServ.removeTask(id);
  }

  @Patch('/:id/status')
  onUpdateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskServ.updateTaskStatus(id, status);
  }
}
