import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'app',
    loadChildren: () => import('./layout/app.layout.module').then(m => m.AppLayoutModule),
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  }
];
