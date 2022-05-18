import { NgModule } from "@angular/core";
import { TodosComponent } from "./components/todos/todos.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { TodosService } from "./services/todos.service";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "./components/main/todo/todo.component";
import { FooterComponent } from "./components/footer/footer.component";

const routes: Routes = [
    {
        path: '',
        component: TodosComponent
    }
]

@NgModule({
    declarations: [
        TodosComponent, 
        HeaderComponent,
        MainComponent, 
        TodoComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)],
    providers: [TodosService]
})
export class TodosModule {}