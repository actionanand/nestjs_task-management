import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status-enum.model';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    let foundTask: Task;
    let errMsg = `Task with id: '${id}' not found.`;

    try {
      foundTask = await this.taskRepo.findOne({ where: { id } });
    } catch (error) {
      errMsg = error.message || 'Oops, Something went wrong.';
    }

    if (!foundTask) {
      throw new NotFoundException(errMsg);
    }

    return foundTask;
  }
}
