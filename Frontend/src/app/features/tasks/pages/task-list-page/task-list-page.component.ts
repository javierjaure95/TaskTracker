import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../../../models/task-list.model';
import { TaskListFormComponent } from '../../components/create-task-list-form/create-task-list-form.component';
import { Router } from '@angular/router';
import { TaskListService } from '../../../../services/task-list.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TaskListFormComponent, HttpClientModule],
  providers: [TaskListService],
  templateUrl: './task-list-page.component.html'
})
export class TaskListPageComponent implements OnInit {
  taskLists: TaskList[] = [];
  showCreateForm = false;

  constructor(private router: Router, private taskListService: TaskListService) {}

  ngOnInit() {
    this.loadTaskLists();
  }

  loadTaskLists() {
    this.taskListService.getTaskLists().subscribe({
      next: (lists) => {
        this.taskLists = lists;
      },
      error: (err) => {
        console.error('Error loading task lists:', err);
      }
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onCreateTaskList(data: { title: string; description: string }) {
    console.log('Datos recibidos para crear Task List:', data);
    this.showCreateForm = false;
    // Aquí luego se puede agregar la llamada para crear en backend
  }

  goToTaskListDetail(id: string) {
    this.router.navigate(['/tasks', id]);
  }
}
