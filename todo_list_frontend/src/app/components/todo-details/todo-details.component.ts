import {Component, OnInit} from '@angular/core';

import {Todo} from '../../models/todo'
import {TodoService} from '../../services/todo.service'
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-todo-details',
    templateUrl: './todo-details.component.html',
    styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit {

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

    list() {
        this.router.navigate(['todos']);
    }

}
