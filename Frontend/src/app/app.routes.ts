import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/task-routes').then(m => m.TASK_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'tasks'
  }
];