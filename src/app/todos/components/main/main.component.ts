import { Component } from "@angular/core";
import { combineLatest, filter, map, Observable } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";
import { TodoInterface } from "../../types/todo.interface";

@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html'
})
export class MainComponent {
    visibleTodos$: Observable<TodoInterface[]>;
    noTodoClass$: Observable<boolean>;
    isAllTodoSelected$: Observable<boolean>;

    editingId: string | null = null;

    constructor(private todosService: TodosService) {

        this.isAllTodoSelected$ = this.todosService.todos$.pipe(
            map((todos) => todos.every((todo) => todo.isCompleted))
        )

        this.noTodoClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );

        this.visibleTodos$ = combineLatest(
            this.todosService.todos$,
            this.todosService.filter$
        ).pipe(
            map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                if (filter === FilterEnum.active) {
                    return todos.filter(todos => !todos.isCompleted)
                } else if (filter === FilterEnum.completed) {
                    return todos.filter(todos => todos.isCompleted)
                }
                return todos
            })
        )

       
    }

    toggleAllTodos(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.todosService.toggleAll(target.checked)
    }


    setEditingId(editingId: string | null): void {
        this.editingId = editingId
    }
}


