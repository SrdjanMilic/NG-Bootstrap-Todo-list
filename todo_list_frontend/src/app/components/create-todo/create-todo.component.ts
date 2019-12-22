import {Component, OnInit} from '@angular/core';

import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo'
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-todo',
    templateUrl: './create-todo.component.html',
    styleUrls: ['./create-todo.component.css']
})

export class CreateTodoComponent implements OnInit {

    todo: Todo = new Todo();
    submitted = false;

    constructor(private todoService: TodoService, private router: Router) {
    }

    ngOnInit() {
    }

    newTodo(): void {
        this.submitted = false;
        this.todo = new Todo();
    }

    save() {
        this.todoService.createTodo(this.todo)
            .subscribe(data => console.log(data), error => console.log(error));
        this.todo = new Todo();
        this.gotoList();
    }

    onSubmit() {
        this.submitted = true;
        this.save();
    }

    gotoList() {
        this.router.navigate(['/todos']);
    }

}
