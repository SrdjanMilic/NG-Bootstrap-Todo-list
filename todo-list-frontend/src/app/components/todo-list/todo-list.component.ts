import { Component, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TableService } from '../table-complete/table.service';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo';
import { NgbdSortableHeader, SortEvent } from '../table-complete/sortable.directive';

import { MyBootstrapModalComponent } from '../my-bootstrap-modal/my-bootstrap-modal.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [TableService, UpdateTodoComponent]
})

export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private todoService: TodoService, private router: Router, private modalService: NgbModal,
              public tableService: TableService, public updateTodoComponent: UpdateTodoComponent,
              public myBootstrapModalCoomponent: MyBootstrapModalComponent, private ref: ChangeDetectorRef) {
    this.todos$ = this.tableService.todos$;
    this.total$ = this.tableService.total$;
  }

  ngOnInit(): void {
    this.reloadData();
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }

  openModalDelete(id: string) {
    const submitButton: HTMLElement = document.createElement('button') as HTMLElement;
    const modalRef = this.modalService.open(MyBootstrapModalComponent,
      {
        // scrollable: true,
        // windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });

    modalRef.componentInstance.title = 'Delete Todo';
    modalRef.componentInstance.body = 'Are you sure you want to delete this todo?';

    submitButton.className = 'btn btn-success';
    submitButton.setAttribute('id', 'list-button');
    submitButton.innerText = 'Submit';
    document.getElementById('modal-footer').appendChild(submitButton);
    document.getElementById('list-button').setAttribute('type', 'button');
    // must be arrow function because: 'In arrow function this always point to the context it is called from.'
    submitButton.onclick = () => {
      this.deleteTodo(id);
    };
  }

  reloadData() {
    this.todoService.getTodoList()
      .subscribe(todos => {
        for (const elem of todos) {
          // Pushing the data to todoArray
          this.tableService.todoArray.push(elem);
          // Get data length
        }
        console.log('array at page load: ' + this.tableService.todoArray.length);
      }, error => console.log(error));
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id)
      .subscribe(todo => {
        console.log(todo); // print message from server
      },
        error => console.log(error)
      );
    this.todos$.subscribe(todos => {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i]._id === id) {
          todos.splice(i, 1);
        }
      }
    });
    this.tableService.todoArray.length--;
    this.modalService.dismissAll();
  }

  todoDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  updateTodo(id: string) {
    this.router.navigate(['update', id]);
  }
}
