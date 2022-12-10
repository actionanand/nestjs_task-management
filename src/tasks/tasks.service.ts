import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.getTask(id);
  }

  removeTask(id: string) {
    const task = this.getTask(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }

  updateTaskStatus(id: string, taskStatus: TaskStatus) {
    const task = this.getTask(id);
    const updatedTask = { ...task, status: taskStatus };
    const updatedtasks = [
      ...this.tasks.filter((task) => task.id !== id),
      updatedTask,
    ];
    this.tasks = updatedtasks;
    return task;
  }

  private getTask(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
}
