import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList } from '../../../../models/task-list.model';
import { Task } from '../../../../models/task.model';
import { TaskFormComponent } from '../../components/create-task-form/create-task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../../../../services/task.service';
import { TaskListService } from '../../../../services/task-list.service';
import { TaskCreateDto } from '../../../../models/task.model';
import { TaskTableComponent } from '../../components/task-table/task-table.component';
import { TaskStatus } from '../../../../models/enums/task.enums';

@Component({
  selector: 'app-task-list-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    HttpClientModule,
    TaskTableComponent,
  ],
  providers: [TaskListService, TaskService],
  templateUrl: './task-list-detail-page.component.html',
})
export class TaskListDetailPageComponent implements OnInit {
  taskList: TaskList | undefined;
  tasks: Task[] = [];
  showCreateForm = false;
  taskListId!: string;
  isLoaded = false;
  taskBeingEdited: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private taskListService: TaskListService
  ) {}

  ngOnInit() {
    this.taskListId = this.route.snapshot.paramMap.get('id') || '';

    this.taskListService.getTaskListById(this.taskListId).subscribe({
      next: (list) => (this.taskList = list),
      error: (err) => console.error('Error loading task list:', err),
    });

    this.taskService.getTasks(this.taskListId).subscribe({
      next: (tasks) => {
        (this.tasks = tasks), (this.isLoaded = true);
      },
      error: (err) => console.error('Error loading tasks:', err),
    });
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
  }

  onDeleteTask(taskId: string) {
    if (!this.taskListId) return;

    this.taskService.deleteTask(this.taskListId, taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);

        if (this.taskList) {
          this.taskList.progress = this.calculateProgress(this.tasks);
          this.taskList.count = this.tasks.length;
        }
      },
      error: (err) => {
        console.error('Failed to delete task', err);
      },
    });
  }

  onEditTask(updatedTask: Task) {
    if (!this.taskListId) return;

    this.taskService
      .updateTask(this.taskListId, updatedTask.id, updatedTask)
      .subscribe({
        next: (task) => {
          this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));

          if (this.taskList) {
            this.taskList.progress = this.calculateProgress(this.tasks);
            this.taskList.count = this.tasks.length;
          }
        },
        error: (err) => {
          console.error('Failed to update task', err);
        },
      });
  }

  onToggleStatus(task: Task) {
    const updatedStatus =
      task.status === TaskStatus.COMPLETED
        ? TaskStatus.COMPLETED
        : TaskStatus.OPEN;
    const updatedTask: Task = { ...task, status: updatedStatus };
    this.onEditTask(updatedTask);
  }

  calculateProgress(tasks: Task[]): number {
    if (!tasks.length) return 0;
    const completedTasks = tasks.filter(
      (t) => t.status === TaskStatus.COMPLETED
    ).length;
    return completedTasks / tasks.length;
  }

  onClickEdit(task: Task) {
    this.taskBeingEdited = task;
    this.showCreateForm = true;
  }

  onSubmitTaskForm(formData: TaskCreateDto) {
    if (!this.taskListId) return;

    const formattedData: TaskCreateDto = {
      ...formData,
      dueDate: formatDate(formData.dueDate, "yyyy-MM-dd'T'HH:mm:ss", 'en-US'),
    };

    if (this.taskBeingEdited) {
      const updatedTask: Task = {
        ...this.taskBeingEdited,
        ...formattedData,
      };

      this.taskService
        .updateTask(this.taskListId, updatedTask.id, updatedTask)
        .subscribe({
          next: (task) => {
            this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
            this.taskBeingEdited = null;
            this.showCreateForm = false;
          },
          error: (err) => {
            console.error('Failed to update task', err);
          },
        });
    } else {
      this.taskService.createTask(this.taskListId, formattedData).subscribe({
        next: (createdTask) => {
          this.tasks.push(createdTask);
          this.showCreateForm = false;
          if (this.taskList) {
            this.taskList.progress = this.calculateProgress(this.tasks);
            this.taskList.count = this.tasks.length; 
          }
        },
        error: (err) => {
          console.error('Error creating task:', err);
        },
      });
    }
  }
}
