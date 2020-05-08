import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';

const routes: Routes = [
    {path: '', redirectTo: 'todos', pathMatch: 'full'},
    {path: 'todos', component: TodoListComponent},
    {path: 'update/:id', component: UpdateTodoComponent},
    {path: 'details/:id', component: TodoDetailsComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
