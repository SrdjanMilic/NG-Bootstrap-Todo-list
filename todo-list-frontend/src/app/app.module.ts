import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule, NgbPaginationModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTodoComponent } from './components/new-todo/new-todo.component';

import { NgbdSortableHeader } from './components/table-complete/sortable.directive';
import { MyBootstrapModalComponent } from './components/my-bootstrap-modal/my-bootstrap-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        TodoDetailsComponent,
        TodoListComponent,
        UpdateTodoComponent,
        NewTodoComponent,
        NgbdSortableHeader,
        MyBootstrapModalComponent
    ],

    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        NgbPaginationModule,
        ReactiveFormsModule
    ],
    providers: [UpdateTodoComponent, MyBootstrapModalComponent, NgbActiveModal],
    entryComponents: [MyBootstrapModalComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
