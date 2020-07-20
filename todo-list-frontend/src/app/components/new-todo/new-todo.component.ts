import { Component, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TableService } from '../table-complete/table.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css']
})
export class NewTodoComponent {
  todoNew: Todo = new Todo();

  @Input() id: string;
  public element: any;

  constructor(public el: ElementRef, private ngbModal: NgbModal,
              private todoListComponent: TodoListComponent, private todoService: TodoService,
              public tableService: TableService) {
    this.element = el.nativeElement;
  }

  newTodoObject() {
    this.todoService.createTodo(this.todoNew)
      .subscribe(data => {
        console.log(data);
      }, error => console.log(error));
  }

  // Create new todo from modal
  onSubmit() {
    this.newTodoObject();
    this.todoListComponent.todoLength++;
    this.tableService.todoArray.length++;
    this.ngbModal.dismissAll();
    this.todoListComponent.reloadData();
  }

  // Trigger modal
  open(content: void) {
    this.ngbModal.open(content);
  }

  // Close modal
  close() {
    this.ngbModal.dismissAll();
  }
}
