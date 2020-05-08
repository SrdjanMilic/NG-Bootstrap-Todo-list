import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class TodoService {

    private baseUrl = 'http://localhost:3000/api/v1/todoDB';

    checkStatus = false;

    constructor(private http: HttpClient) {
    }

    getTodo(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createTodo(todo: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, todo);
    }

    updateTodo(id: number, value: any): Observable<Object> {
        return this.http.patch(`${this.baseUrl}/${id}`, value);
    }

    deleteTodo(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
    }

    // Get all Todos
    getTodoList(): Observable<any> {
        this.checkStatus = true;
        console.log(this.checkStatus);
        return this.http.get(`${this.baseUrl}`);
    }
}
