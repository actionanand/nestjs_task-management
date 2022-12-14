import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
// import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskDelResp, TaskStatus } from './task.model';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TaskController', { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async getTasks(
    { status, search }: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    const query = this.taskRepo.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :statusVal', { statusVal: status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const foundTasks = await query.getMany();
      return foundTasks;
    } catch (error) {
      this.logger.error(
        `Failed to fetch the tasks for the User 'username: ${user.username}' - 'ID: ${user.id}'.`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Unable to fetch tasks!, Please try after sometime.',
      );
    }
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    let foundTask: Task;
    let errMsg = `Task with id: '${id}' not found.`;

    try {
      foundTask = await this.taskRepo.findOne({ where: { id, user } });
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

  async removeTask(id: string, user: User): Promise<TaskDelResp> {
    const deleteResp: TaskDelResp = {
      id,
      message: 'Task deleted successfully.',
    };

    const result = await this.taskRepo.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(
        `Unable to delete the task with id: '${id}'.`,
      );
    }

    return deleteResp;
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User) {
    const foundTask: Task = await this.getTaskById(id, user);
    foundTask.status = status;

    await this.taskRepo.save(foundTask);
    return foundTask;
  }
}
