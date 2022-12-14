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
import { Logger } from '@nestjs/common';

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
  private logger = new Logger('TaskController', { timestamp: true });

  constructor(private readonly taskServ: TasksService) {}

  @Get()
  onGetTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User 'username: ${user.username}' - 'ID: ${
        user.id
      }' retrieving all tasks with filters: ${JSON.stringify(filterDto)}.`,
    );
    return this.taskServ.getTasks(filterDto, user);
  }

  @Get('/:id')
  onGetTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskServ.getTaskById(id, user);
  }

  @Post()
  onCreateTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `user 'username: ${user.username}' - 'ID: ${
        user.id
      }' creating a task with data: ${JSON.stringify(createTaskDto)}`,
    );
    return this.taskServ.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  onRemoveTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<TaskDelResp> {
    return this.taskServ.removeTask(id, user);
  }

  @Patch('/:id/status')
  onUpdateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskServ.updateTaskStatus(id, status, user);
  }
}
