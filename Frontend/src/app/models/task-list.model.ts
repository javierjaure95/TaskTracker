import { Task } from './task.model';

export interface TaskList {
  id: string;
  title: string;
  description: string;
  count: number;
  progress: number;
  tasks: Task[];
}