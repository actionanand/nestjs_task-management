import { Injectable } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return [...this.tasks];
  }

  getTasksWithFilters({ status, search }: GetTaskFilterDto): Task[] {
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLocaleLowerCase().includes(search) ||
          task.description.toLocaleLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
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
