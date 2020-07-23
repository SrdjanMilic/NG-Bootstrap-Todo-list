import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  private baseUrl = 'http://localhost:3002/api/v1/todoListDB';

  constructor(private http: HttpClient) { }

  getTodo(id: string): Observable<any> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseUrl}`, todo);
  }

  updateTodo(id: string, value: Todo): Observable<object> {
    return this.http.patch<Todo>(`${this.baseUrl}/${id}`, value);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  // Get all Todos
  getTodoList(): Observable<any> {
    return this.http.get<Todo[]>(`${this.baseUrl}`);
  }
}
