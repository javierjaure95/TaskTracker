import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../../../models/task-list.model';
import { MOCK_TASK_LISTS } from '../../../../mocks/mock-task-data';
import { TaskListFormComponent } from '../../components/create-task-list-form/create-task-list-form.component';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TaskListFormComponent],
  templateUrl: './task-list-page.component.html'
})
export class TaskListPageComponent {
  taskLists: TaskList[] = MOCK_TASK_LISTS;

  
  showCreateForm = false;

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }
  
  onCreateTaskList(data: { title: string; description: string }) {
    console.log('Datos recibidos para crear Task List:', data);
    this.showCreateForm = false;
}

}
