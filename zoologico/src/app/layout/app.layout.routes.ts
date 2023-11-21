import { Routes } from "@angular/router";
import { HomeComponent } from "../pages/home/home.component";
import { AppLayoutComponent } from "./app.layout.component";

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/app/home',
    pathMatch: 'full',
  }
];
