import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/layout.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss']
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
        transform:scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
    }
  `],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit, AfterViewInit, OnChanges {

  isLoggedIn: boolean = false;

  msgs: Message[] = [];

  valCheck: string[] = ['remember'];

  password!: string;

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    private service: MessageService
  ) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    if (localStorage.getItem('token')) {
      this.authService.isLoggedIn = true;
      this.isLoggedIn = this.authService.isLoggedIn;
      window.location.href = '/app/home';
    }
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    
    // throw new Error('Method not implemented.');
  }

  unloadHandler(event: BeforeUnloadEvent) {
    console.log('unloadHandler');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.isLoggedIn = false;
    this.isLoggedIn = this.authService.isLoggedIn;
    window.location.href = '/login';
  }

  login() {
    localStorage.setItem('token', 'JWT');
    localStorage.setItem('username', 'admin');
    
    this.authService.isLoggedIn = true;
    
    this.showSuccessViaToast();

    setTimeout(() => {
      // window.location.href = '/app/home';
    }, 300);
  }

  showSuccessViaToast() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }

}
