import { Component, OnInit } from '@angular/core';

import { Todo } from '../../models/todo'
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';

@Component({
    selector: 'app-update-todo',
    templateUrl: './update-todo.component.html',
    styleUrls: ['./update-todo.component.css']
})

export class UpdateTodoComponent implements OnInit {

    id: number;
    todo: Todo;

    constructor(private route: ActivatedRoute, private router: Router,
                private todoService: TodoService) {
    }

    ngOnInit() {
        this.todo = new Todo();

        this.id = this.route.snapshot.params['id'];

        this.todoService.getTodo(this.id)
            .subscribe(data => {
                console.log(data);
                this.todo = data;
            }, error => console.log(error));
    }

    onSubmit() {
        this.todoService.updateTodo(this.id, this.todo)
            .subscribe(data => console.log(data), error => console.log(error));
        this.todo = new Todo();
        this.router.navigate(['/todos']);
    }
}
