import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";
import { TodoService } from "../../services/todo.service";
import { Todo } from "../../models/todo";
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: Observable<Todo[]>;
  dtOptions: DataTables.Settings = {};

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [ [5, 25, 50, -1], [5, 25, 50, "All"] ]
    };
  }

  reloadData() {
    this.todos = this.todoService.getTodosList();
  }

  deleteTodo(id: number)  {
      if(window.confirm('Are you sure?')) {
          this.todoService.deleteTodo(id)
              .subscribe(
                  data => {
                      console.log(data);
                      this.reloadData();
                  },
                  error => console.log(error)
              );
      }
  }

  todoDetails(id: number) {
    this.router.navigate(['details', id])
  }

  updateTodo(id: number) {
    this.router.navigate(['update', id]);
  }
}
