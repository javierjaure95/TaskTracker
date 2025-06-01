import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-list-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-task-list-form.component.html'
})
export class TaskListFormComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() create = new EventEmitter<{ title: string; description: string }>();


  onSubmit() {
    this.create.emit({ title: this.title, description: this.description });
  }
}
