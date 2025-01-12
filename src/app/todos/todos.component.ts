import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';

export interface ITodo {
  id: number;
  todo: string;
  completed: string;
  userId: number;
}

export interface IResponse {
  limit: number;
  skip: number;
  total: number;
  todos: ITodo[];
}
@Component({
  selector: 'app-todos',
  standalone: false,

  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todo: ITodo[] = [];
  done: ITodo[] = [];
  totalToDoPageSize = 0;
  totalDonePageSize = 0;

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
    this.loadToDOList().subscribe();
  }

  loadToDOList(qureyString: string = '') {
    let apiUrl = 'https://dummyjson.com/todos';
    if (qureyString !== '') {
      apiUrl = apiUrl + qureyString;
    }
    return this.httpClient.get<IResponse | null>(apiUrl).pipe(
      map((response: any) => (!!response ? (response as IResponse) : null)),
      map((response: IResponse | null) => {
        console.log('response ', response);

        if (!!response) {
          this.todo = response.todos.filter((data) => !data.completed);
          this.done = response.todos.filter((data) => data.completed);
          this.totalToDoPageSize = response.total;
          this.totalDonePageSize = response.total;
        } else {
          this.todo = [];
        }
      })
    );
  }
  drop(event: CdkDragDrop<any>) {
    console.log(event);

    console.log(event.previousContainer === event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // this.updateToDo()
    }
  }

  toDoOnPageChange(event: PageEvent): void {
    console.log(event);

    this.loadToDOList(
      `?limit=${event.pageSize}&skip=${event.pageIndex * event.pageSize}`
    ).subscribe();
  }

  doneOnPageChange(event: PageEvent): void {
    this.loadToDOList(
      `?limit=${event.pageSize}&skip=${event.pageIndex * event.pageSize}`
    ).subscribe();
  }

  updateToDo(id: number, todo: ITodo) {
    let apiUrl = 'https://dummyjson.com/todos/' + id;
    this.httpClient.put(apiUrl, todo).subscribe((data) => {
      console.log(data);
    });
  }
}
