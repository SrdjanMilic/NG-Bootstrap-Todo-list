import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
    providers: [TodoListComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'Todo List';

    constructor() { }
}