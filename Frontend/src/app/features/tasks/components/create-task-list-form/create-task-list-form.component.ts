import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-task-list-form.component.html'
})
export class TaskListFormComponent {
  @Output() create = new EventEmitter<{ title: string; description: string }>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
      this.form.reset();
    }
  }
}
