import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { AppLayoutComponent } from "./app.layout.component";
import { AnimalsComponent } from "../pages/animals/animals.component";

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
        component: AnimalsComponent,
        children: [
          {
            path: 'todos',
            component: AnimalsComponent
          },
          {
            path: 'mamiferos',
            component: AnimalsComponent
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
