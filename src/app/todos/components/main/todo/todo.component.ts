import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from "@angular/core";
import { TodosService } from "src/app/todos/services/todos.service";
import { TodoInterface } from "src/app/todos/types/todo.interface";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit{
   
    @Input('todo') todoProps!: TodoInterface; 
    @Input('isEditing') isEditingProps!: boolean;
    @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()


    @ViewChild('textInput') textInput: ElementRef | undefined;

    constructor(private todoService: TodosService) {}

    editingText: string = '';

    ngOnInit(): void {
        this.editingText = this.todoProps.text;
    }

    setTodoInEditMode() {
        this.setEditingIdEvent.emit(this.todoProps.id)
    }

    toggleTodo():void {
        this.todoService.toggleTask(this.todoProps.id)
    }

    removeTodo():void {
        this.todoService.deleteTodo(this.todoProps.id)
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.editingText = value;
    }

    changeTodo(): void {
        this.todoService.changeTodo(this.todoProps.id, this.editingText)
        this.setEditingIdEvent.emit(null);

    }
}