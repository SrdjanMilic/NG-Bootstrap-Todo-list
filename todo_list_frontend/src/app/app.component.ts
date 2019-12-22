import { Component, OnInit } from '@angular/core';

import { TodoService } from './services/todo.service';
import { Todo } from './models/todo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Todo List';
  todo: Todo = new Todo();
  submitted = false;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit() {
  }

  // newTodo(): void {
  //   this.submitted = false;
  //   this.todo = new Todo();
  // }

  save() {
    this.todoService.createTodo(this.todo)
        .subscribe(data => console.log(data), error => console.log(error));
    this.todo = new Todo();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  // onClose(): void {
  //   // this.todoList.reloadData();
  //   // alert('Are you sure?');
  //   window.location.reload();
  // }

}