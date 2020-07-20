import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Todo } from '../../models/todo';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from './sortable.directive';

interface SearchResult {
  todos: Todo[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1: void, v2: void) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(todos: Todo[], column: string, direction: string): Todo[] {
  if (direction === '') {
    return todos;
  } else {
    return [...todos].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(todo: Todo, term: string) {
  return todo.title.toLowerCase().includes(term.toLowerCase())
    || todo.description.toLocaleLowerCase().includes(term.toLowerCase());
}

@Injectable({ providedIn: 'root' })

export class TableService {
  todoArray = [];
  // tslint:disable: variable-name
  private _search$ = new Subject<void>();
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._todos$.next(result.todos);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  private _loading$ = new BehaviorSubject<boolean>(true);

  get loading$() {
    return this._loading$.asObservable();
  }

  private _todos$ = new BehaviorSubject<Todo[]>([]);

  get todos$() {
    return this._todos$.asObservable();
  }

  private _total$ = new BehaviorSubject<number>(0);

  get total$() {
    return this._total$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  set page(page: number) {
    this._set({ page });
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  public _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let todos = sort(this.todoArray, sortColumn, sortDirection);

    // 2. filter
    todos = todos.filter(todo => matches(todo, searchTerm));
    const total = todos.length;

    // 3. paginate
    todos = todos.map((todo, i) => ({ id: i + 1, ...todo }));
    todos = todos.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ todos, total });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
}
