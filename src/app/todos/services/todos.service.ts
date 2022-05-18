import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FilterEnum } from "../types/filter.enum";
import { TodoInterface } from "../types/todo.interface";

@Injectable()
export class TodosService {
    todos$ = new BehaviorSubject<TodoInterface[]>([]);

    filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all)

    addTodo(text: string): void {
        const newTodo: TodoInterface = {
            text,
            isCompleted: false,
            id: Math.random().toString(16)
        }

        const updatedTodos = [...this.todos$.getValue(), newTodo];
        this.todos$.next(updatedTodos)
    }

    toggleAll(isCompleted: boolean): void {
        const updateTodos = this.todos$.getValue().map(todo => {
            console.log(isCompleted)
            return {
                ...todo,
                isCompleted
            }
        })
        this.todos$.next(updateTodos)
    }

    changeFilterName(filterName: FilterEnum): void {
        this.filter$.next(filterName)
    }

    changeTodo(id: string, text: string): void {
        const updateTodos = this.todos$.getValue().map(todo => {

            if (todo.id === id) {
                return {
                    ...todo,
                    text
                }
            }
            return todo
        });
        this.todos$.next(updateTodos)
    }

    toggleTask(id: string): void {
        const updateTodos = this.todos$
            .getValue()
            .map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo, 
                        isCompleted: !todo.isCompleted
                    }
                } 
                return todo;
            })
        this.todos$.next(updateTodos)
    }

    deleteTodo(id: string): void {
        const updateTodos = this.todos$
            .getValue()
            .filter(todo => todo.id !== id)
        this.todos$.next(updateTodos)
    }
}