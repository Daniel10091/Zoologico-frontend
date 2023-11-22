import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../layout.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss'],
  styles: [`
      :host ::ng-deep .p-menubar-root-list {
          flex-wrap: wrap;
      }
  `]
})
export class AppTopbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  menuItems: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Conta', icon: 'pi pi-fw pi-user'
      },
      {
        label: 'Opções', icon: 'pi pi-fw pi-cog'
      },
      {
        separator: true
      },
      {
        label: 'Sair', icon: 'pi pi-fw pi-sign-out',
        command: this.logout.bind(this)
      },
    ];
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.isLoggedIn = false;
    this.isLoggedIn = this.authService.isLoggedIn;
    window.location.href = '/login';
  }

}
