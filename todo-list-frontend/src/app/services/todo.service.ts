import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TodoService {

    private baseUrl = 'http://localhost:3000/api/v1/todoListDB';

    constructor(private http: HttpClient) {
    }

    getTodo(id: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createTodo(todo: object): Observable<object> {
        return this.http.post(`${this.baseUrl}`, todo);
    }

    updateTodo(id: string, value: any): Observable<object> {
        return this.http.patch(`${this.baseUrl}/${id}`, value);
    }

    deleteTodo(id: string): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
    }

    // Get all Todos
    getTodoList(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
    }
}
