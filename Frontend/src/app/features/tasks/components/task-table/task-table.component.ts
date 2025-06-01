import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../models/task.model';
import { TaskStatus } from '../../../../models/enums/task.enums';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-table.component.html',
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() showCreateForm: boolean = false;
  @Input() darkMode: boolean = false;
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<string>();

  @Output() toggleStatus = new EventEmitter<Task>();

  priorityLabels: { [key: string]: string } = {
    LOW: 'BAJA',
    MEDIUM: 'MEDIA',
    HIGH: 'ALTA',
  };

  onToggle(task: Task) {
    const updatedTask: Task = {
      ...task,
      status:
        task.status === TaskStatus.COMPLETED
          ? TaskStatus.OPEN
          : TaskStatus.COMPLETED,
    };
    this.toggleStatus.emit(updatedTask);
  }

  onEdit(task: Task) {
    this.editTask.emit(task);
  }

  onDelete(taskId: string) {
    this.deleteTask.emit(taskId);
  }

  readonly statusEnum = TaskStatus;
}
