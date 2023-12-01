import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { AppLayoutComponent } from "./app.layout.component";
import { AnimalsComponent } from "../pages/animals/animals.component";
import { MammalsComponent } from "../pages/animals/categories/mammals/mammals.component";
import { ZoosComponent } from "../pages/zoos/zoos.component";
import { SuppliersComponent } from "../pages/suppliers/suppliers.component";
import { EmployeesComponent } from "../pages/employees/employees.component";

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'inicio',
      //   pathMatch: 'full',
      // },
      {
        path: 'inicio',
        component: HomeComponent
      },
      {
        path: 'animais',
        // loadChildren: () => import('../pages/animals/animals.module').then(m => m.AnimalsModule),
        // component: AnimalsComponent,
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
      },
      {
        path: 'zoologicos',
        children: [
          {
            path: 'todos',
            component: ZoosComponent
          }
        ]
      },
      {
        path: 'fornecedores',
        children: [
          {
            path: 'todos',
            component: SuppliersComponent
          }
        ]
      },
      {
        path: 'funcionarios',
        children: [
          {
            path: 'todos',
            component: EmployeesComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'inicio',
    pathMatch: 'full',
  }
];
