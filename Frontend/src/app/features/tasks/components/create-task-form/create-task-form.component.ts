import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TaskCreateDto } from '../../../../models/task.model';
import { Task } from '../../../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task-form.component.html',
})
export class TaskFormComponent implements OnChanges {
  @Input() initialData: Task | null = null;
  @Output() submitTask = new EventEmitter<TaskCreateDto>();

  taskForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(255)],
      dueDate: ['', Validators.required],
      priority: ['MEDIUM', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialData'] && this.initialData) {
      this.isEditMode = true;
      const formattedDate = this.initialData.dueDate.split('T')[0];
      this.taskForm.setValue({
        title: this.initialData.title,
        description: this.initialData.description,
        dueDate: formattedDate,
        priority: this.initialData.priority,
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.taskForm.valid) {
      this.submitTask.emit(this.taskForm.value);
    }
  }
}
