import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodosClass$: Observable<boolean>;
    activeCount$: Observable<number>;
    itemsLeft$: Observable<string>;    
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum;

    constructor(private todosService: TodosService) {

        this.activeCount$ = this.todosService.todos$.pipe(
            map((todos) => todos.filter((todo) => !todo.isCompleted).length)
        );

        this.itemsLeft$ = this.activeCount$.pipe(
            map((activeCount) => `item${activeCount !== 1 ? 's' : ''} left`)
        )

        this.noTodosClass$ = this.todosService.todos$.pipe(
            map((todos) => todos.length === 0)
        );

        this.filter$ = this.todosService.filter$
    }

    changeFilter(event: Event, filterName: FilterEnum): void {
        event.preventDefault();
        this.todosService.changeFilterName(filterName) 
    }

}