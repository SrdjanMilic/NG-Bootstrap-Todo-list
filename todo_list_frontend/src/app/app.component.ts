import { Component, OnInit } from '@angular/core';

import { TodoService } from './services/todo.service';
import { Todo } from './models/todo';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'Todo List';
    todo: Todo = new Todo();
    isClicked = false;

    constructor(private todoService: TodoService) { }

    ngOnInit() {
    }

    /*
     newTodo(): void {
     this.submitted = false;
     this.todo = new Todo();
     }
     */

    onSubmit() {
        this.todoService.createTodo(this.todo)
            .subscribe(data => console.log(data), error => console.log(error));
        this.todo = new Todo();
        this.isClicked = true;
        console.log('clicked');
    }

    onClose() {
        if(this.isClicked) {
            window.location.reload();
        }
    }

}