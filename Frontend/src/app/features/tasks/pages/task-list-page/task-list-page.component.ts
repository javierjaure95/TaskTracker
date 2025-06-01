import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../../../models/task-list.model';
import { TaskListFormComponent } from '../../components/create-task-list-form/create-task-list-form.component';
import { Router } from '@angular/router';
import { TaskListService } from '../../../../services/task-list.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskListCreateDto } from '../../../../models/task-list-create.dto';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TaskListFormComponent, HttpClientModule, FormsModule],
  providers: [TaskListService],
  templateUrl: './task-list-page.component.html',
})
export class TaskListPageComponent implements OnInit {
  taskLists: TaskList[] = [];
  showCreateForm = false;
  editingListId: string | null = null;
  editTitle: string = '';
  editDescription: string = '';

  constructor(
    private router: Router,
    private taskListService: TaskListService
  ) {}

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
      },
    });
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onCreateTaskList(data: TaskListCreateDto) {
    this.taskListService.createTaskList(data).subscribe({
      next: (createdTaskList) => {
        console.log('Task List creado:', createdTaskList);
        this.showCreateForm = false;
        this.loadTaskLists();
      },
      error: (err) => {
        console.error('Error creando task list:', err);
      },
    });
  }

  goToTaskListDetail(id: string) {
    this.router.navigate(['/tasks', id]);
  }

  onDeleteTaskList(id: string) {
    this.taskListService.deleteTaskList(id).subscribe({
      next: () => {
        this.taskLists = this.taskLists.filter((list) => list.id !== id);
      },
      error: (err) => {
        console.error('Error deleting task list:', err);
      },
    });
  }

  editTaskList(updatedList: TaskList) {
    this.taskListService.updateTaskList(updatedList.id, updatedList).subscribe({
      next: (updated) => {
        const index = this.taskLists.findIndex(
          (list) => list.id === updated.id
        );
        if (index !== -1) {
          this.taskLists[index] = updated;
        }
      },
      error: (err) => {
        console.error('Error updating task list:', err);
      },
    });
  }

  startEditing(list: TaskList, event: MouseEvent) {
    event.stopPropagation(); 
    this.editingListId = list.id;
    this.editTitle = list.title;
    this.editDescription = list.description;
  }

  saveEdit(list: TaskList) {
    if (!this.editTitle.trim() || !this.editDescription.trim()) {
      return; 
    }

    const updatedList = {
      ...list,
      title: this.editTitle,
      description: this.editDescription,
    };

    this.taskListService.updateTaskList(updatedList.id, updatedList).subscribe({
      next: (updated) => {
        const index = this.taskLists.findIndex((l) => l.id === updated.id);
        if (index !== -1) this.taskLists[index] = updated;
        this.editingListId = null;
      },
      error: (err) => {
        console.error('Error updating task list:', err);
      },
    });
  }

  cancelEdit() {
    this.editingListId = null;
  }
}
