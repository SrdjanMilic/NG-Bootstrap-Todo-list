import { Component, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-update-todo',
    templateUrl: './update-todo.component.html',
    styleUrls: ['./update-todo.component.css']
})

export class UpdateTodoComponent implements OnInit {

    id: string;
    todo: Todo;

    constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService,
                private ngbModal: NgbModal) {
    }

    ngOnInit(): void {
        this.todo = new Todo();
        this.id = this.route.snapshot.params.id;
        this.todoService.getTodo(this.id)
            .subscribe(data => {
                console.log(data);
                this.todo = data;
            }, error => console.log(error));
    }

    onSubmit() {
        this.todoService.updateTodo(this.id, this.todo)
            .subscribe(data => console.log(data), error => console.log(error));
        console.log('Submit clicked');
        setTimeout(() => {
            this.router.navigate(['/todos']);
        }, 300);
    }

    // Trigger modal
    // open(content) {
    //    this.ngbModal.open(content);
    // }

    // Close modal
    // close() {
    //    this.ngbModal.dismissAll();
    // }
}
