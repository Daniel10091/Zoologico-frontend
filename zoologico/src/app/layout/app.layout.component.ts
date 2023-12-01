import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-app.layout',
  templateUrl: './app.layout.component.html',
  styleUrls: ['./app.layout.component.scss'],
  providers: [ AuthService ]
})
export class AppLayoutComponent implements OnInit {

  isLoggedIn: boolean = false;

  tieredItems: MenuItem[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.authService.userIsLoggedIn = true;
      this.isLoggedIn = this.authService.userIsLoggedIn;
    } else {
      window.location.href = '/login';
    }
    // console.log('Está logado? ', this.authService.isLoggedIn);

    this.tieredItems = [
      {
        label: 'Animais',
        icon: 'pi pi-fw pi-table',
        items: [
          // {
          //   label: 'Novo',
          //   icon: 'pi pi-fw pi-plus',
          //   items: [
          //     {
          //       label: 'Cadastrar',
          //       icon: 'pi pi-fw pi-plus'
          //     },
          //     {
          //       label: 'Duplicar',
          //       icon: 'pi pi-fw pi-copy'
          //     },

          //   ]
          // },
          // {
          //   label: 'Editar',
          //   icon: 'pi pi-fw pi-user-edit'
          // }

          // {
          //   label: 'Cadastrar',
          //   icon: 'pi pi-fw pi-plus',
          //   routerLink: '/animais/cadastrar'
          // },
          // {
          //   label: 'Listar',
          //   icon: 'pi pi-fw pi-list',
          //   routerLink: '/animais/listar'
          // },
          // {
          //   label: 'Editar',
          //   icon: 'pi pi-fw pi-user-edit',
          //   routerLink: '/animais/editar'
          // },
          // {
          //   label: 'Excluir',
          //   icon: 'pi pi-fw pi-trash',
          //   routerLink: '/animais/excluir'
          // }

          
          // categories
          {
            label: 'Todos',
            routerLink: 'animais/todos'
          },
          {
            label: 'Mamíferos',
            routerLink: 'animais/mamiferos'
          },
          {
            label: 'Aves',
            routerLink: 'animais/aves'
          },
          {
            label: 'Répteis',
            routerLink: 'animais/repteis'
          },
          {
            label: 'Anfíbios',
            routerLink: 'animais/anfibios'
          },
          {
            label: 'Peixes',
            routerLink: 'animais/peixes'
          },
          {
            label: 'Insetos',
            routerLink: 'animais/insetos'
          },
          {
            label: 'Aracnídeos',
            routerLink: 'animais/aracnideos'
          },
          {
            label: 'Moluscos',
            routerLink: 'animais/moluscos'
          },
          {
            label: 'Crustáceos',
            routerLink: 'animais/crustaceos'
          },
          {
            label: 'Equinodermos',
            routerLink: 'animais/equinodermos'
          },
          {
            label: 'Celenterados',
            routerLink: 'animais/celenterados'
          },
          {
            label: 'Poríferos',
            routerLink: 'animais/poriferos'
          },
          {
            label: 'Platelmintos',
            routerLink: 'animais/platelmintos'
          },
          {
            label: 'Nematelmintos',
            routerLink: 'animais/nematelmintos'
          },
          {
            label: 'Anelídeos',
            routerLink: 'animais/anelideos'
          },
          {
            label: 'Artrópodes',
            routerLink: 'animais/artropodes'
          },
        ]
      },
      // {
      //   label: 'Orders',
      //   icon: 'pi pi-fw pi-shopping-cart',
      //   items: [
      //     {
      //       label: 'View',
      //       icon: 'pi pi-fw pi-list'
      //     },
      //     {
      //       label: 'Search',
      //       icon: 'pi pi-fw pi-search'
      //     }
      //   ]
      // },
      {
        label: 'Zoológicos',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Todos',
            routerLink: 'zoologicos/todos',

          },
          // {
          //   label: 'Tracker',
          //   icon: 'pi pi-fw pi-compass',

          // },
          // {
          //   label: 'Map',
          //   icon: 'pi pi-fw pi-map-marker',

          // },
          // {
          //   label: 'Manage',
          //   icon: 'pi pi-fw pi-pencil'
          // }
        ]
      },
      {
        label: 'Fornecedores',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Todos',
            routerLink: 'fornecedores/todos',
          }
        ]
      },
      {
        label: 'Funcionários',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Todos',
            routerLink: 'funcionarios/todos',
          }
        ]
      },
    ];
  }

}
