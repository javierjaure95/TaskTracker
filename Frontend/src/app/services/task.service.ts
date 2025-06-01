import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/task-lists';

  constructor(private http: HttpClient) {}

  getTasks(taskListId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${taskListId}/tasks`);
  }

  getTaskById(taskListId: string, taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`);
  }

  createTask(taskListId: string, data: { title: string; description: string; dueDate: string; priority: 'LOW' | 'MEDIUM' | 'HIGH' }): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${taskListId}/tasks`, data);
  }

  updateTask(taskListId: string, taskId: string, data: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`, data);
  }

  deleteTask(taskListId: string, taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskListId}/tasks/${taskId}`);
  }
}
