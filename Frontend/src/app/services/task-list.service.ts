import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';
//
@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private baseUrl = '/task-lists';

  constructor(private http: HttpClient) {}

  getTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.baseUrl);
  }

  getTaskListById(id: string): Observable<TaskList> {
    return this.http.get<TaskList>(`${this.baseUrl}/${id}`);
  }

  createTaskList(data: { title: string; description: string }): Observable<TaskList> {
    return this.http.post<TaskList>(this.baseUrl, data);
  }

  updateTaskList(id: string, data: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.baseUrl}/${id}`, data);
  }

  deleteTaskList(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
