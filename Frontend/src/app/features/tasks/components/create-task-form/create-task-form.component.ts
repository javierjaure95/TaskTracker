import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskPriority } from '../../../../models/enums/task.enums';

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task-form.component.html'
})
export class CreateTaskFormComponent {
  @Output() submitTask = new EventEmitter<{
    title: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
  }>();

  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['MEDIUM', Validators.required]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.taskForm.valid) {
      this.submitTask.emit(this.taskForm.value);
    }
  }
}
