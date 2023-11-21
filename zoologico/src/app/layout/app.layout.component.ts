import { Component, OnInit } from '@angular/core';
import { LayoutService } from './layout.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-app.layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.authService.isLoggedIn = true;
      this.isLoggedIn = this.authService.isLoggedIn;
    } else {
      window.location.href = '/login';
    }
    // console.log('Está logado? ', this.authService.isLoggedIn);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.isLoggedIn = false;
    this.isLoggedIn = this.authService.isLoggedIn;
    window.location.href = '/login';
  }

}
