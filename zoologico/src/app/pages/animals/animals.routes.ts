import { Routes } from "@angular/router";
import { AnimalsComponent } from "./animals.component";
import { MammalsComponent } from "./categories/mammals/mammals.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'todos',
        component: AnimalsComponent
      },
      {
        path: 'mamiferos',
        component: MammalsComponent
      }
    ]
  }
];
