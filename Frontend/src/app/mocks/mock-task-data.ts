import { Task } from '../models/task.model';
import { TaskList } from '../models/task-list.model';
import { TaskPriority, TaskStatus } from '../models/enums/task.enums';

export const MOCK_TASKS: Task[] = [
  {
    id: '14396d3e-a0bd-4795-8c8f-b88cc151c6bc',
    title: 'Setup Angular App',
    description: 'Initialize project and install dependencies',
    dueDate: '2024-11-01T09:00:00',
    priority: TaskPriority.HIGH,
    status: TaskStatus.COMPLETED
  },
  {
    id: '8c4a2b6e-038d-4a99-aed6-4828e26b7f9f',
    title: 'Create Task List Component',
    description: 'Build the UI for showing task lists',
    dueDate: '2024-11-03T09:00:00',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.OPEN
  }
];

export const MOCK_TASK_LISTS: TaskList[] = [
  {
    id: '71bdf2a4-29dc-4b28-9c4d-5ddd978c4b8f',
    title: 'Frontend Tasks',
    description: 'All frontend-related tasks',
    count: MOCK_TASKS.length,
    progress: 50,
    tasks: MOCK_TASKS
  },
  {
    id: '8c92a8c3-92a7-43cd-9a2a-0f5c1f5f8299',
    title: 'Backend Tasks',
    description: 'Tasks related to API development',
    count: 0,
    progress: 0,
    tasks: []
  }
];
