import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList } from '../../../../models/task-list.model';
import { Task } from '../../../../models/task.model';
import { MOCK_TASK_LISTS, MOCK_TASKS } from '../../../../mocks/mock-task-data';
import { CreateTaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list-detail-page',
  standalone: true,
  imports: [CommonModule, CreateTaskFormComponent],
  templateUrl: './task-list-detail-page.component.html'
})
export class TaskListDetailPageComponent {
  taskList: TaskList | undefined;
  tasks: Task[] = [];
  showCreateForm = false;
taskListId!: string;
  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.taskList = MOCK_TASK_LISTS.find(tl => tl.id === id);

    if (this.taskList) {
      this.tasks = MOCK_TASKS.filter(task => this.taskList?.tasks.some(t => t.id === task.id));
    }
  }

  ngOnInit() {
    this.taskListId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Task List ID:', this.taskListId);
  }
  
  goBack() {
    this.router.navigate(['/tasks']);
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onCreateTask(data: {
    title: string;
    description: string;
    dueDate: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }) {
    console.log('Task to create:', data);
    this.showCreateForm = false;
  }

  // Métodos para editar y borrar se implementarán luego
}
