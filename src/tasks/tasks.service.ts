import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskDelResp, TaskStatus } from './task.model';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async getTasks({ status, search }: GetTaskFilterDto): Promise<Task[]> {
    const query = this.taskRepo.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :statusVal', { statusVal: status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const foundTasks = await query.getMany();
    return foundTasks;
  }

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

  async createTask(
    { title, description }: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const task: Task = this.taskRepo.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepo.save(task);
    return task;
  }

  async removeTask(id: string): Promise<TaskDelResp> {
    const deleteResp: TaskDelResp = {
      id,
      message: 'Task deleted successfully.',
    };

    const result = await this.taskRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Unable to delete the task with id: '${id}'.`,
      );
    }

    return deleteResp;
  }

  async updateTaskStatus(id: string, status: TaskStatus) {
    const foundTask: Task = await this.getTaskById(id);
    foundTask.status = status;

    await this.taskRepo.save(foundTask);
    return foundTask;
  }
}
