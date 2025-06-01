import { Routes } from '@angular/router';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { TaskListDetailPageComponent } from './pages/task-list-detail-page/task-list-detail-page.component';

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: TaskListPageComponent
  },
  {
    path: ':id',
    component: TaskListDetailPageComponent
  }
];