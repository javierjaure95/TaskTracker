import { TaskPriority, TaskStatus } from './enums/task.enums';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskCreateDto {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
}
