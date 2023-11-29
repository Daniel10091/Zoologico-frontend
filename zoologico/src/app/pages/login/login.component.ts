import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/layout.service';
import { Kachel } from 'src/app/models/Kachel';
// import { AuthService } from 'src/app/services/auth/auth.service';

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
export class LoginComponent implements OnInit, OnChanges, AfterViewInit {

  http = inject(HttpClient);

  kachel: Kachel = new Kachel();

  useriIsLoggedIn: boolean = false;

  msgs: Message[] = [];

  valCheck: string[] = ['remember'];

  username!: string;
  emailAddress!: string;
  password!: string;
  rememberme!: boolean;

  invalidEmailAddress: boolean = false;
  invalidPassword: boolean = false;

  constructor(
    public layoutService: LayoutService,
    // public authService: AuthService,
    private service: MessageService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      // this.authService.userIsLoggedIn = true;
      // this.useriIsLoggedIn = this.authService.userIsLoggedIn;
      window.location.href = '/app/home';
    }

    this.username = '';
    this.emailAddress = this.getUserEmailAddress();
    this.password = '';
    this.rememberme = this.isRememberme();

    this.formFieldFocus();

    // window.addEventListener('beforeunload', this.unloadHandler.bind(this));

    // Auto login
    // this.autoLogin();
  }

  ngOnChanges(): void {
    console.log('ngOnChanges');
    
    // throw new Error('Method not implemented.');
  }
  
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
    
    // throw new Error('Method not implemented.');
  }

  unloadHandler(event: BeforeUnloadEvent) {
    console.log('unloadHandler');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // this.authService.userIsLoggedIn = false;
    // this.useriIsLoggedIn = this.authService.userIsLoggedIn;
    window.location.href = '/login';
  }

  login() {
    if (this.userEmailAddressIsValid()) {
      if (this.passwordIsValid()) {
        // this.authService.userIsLoggedIn = true;
        // this.useriIsLoggedIn = this.authService.userIsLoggedIn;
        
        localStorage.setItem('token', 'JWT');
        // localStorage.setItem('username', 'admin');

        // this.showSuccessViaToast();
        // this.authService.login();
        
        setTimeout(() => {
          window.location.href = '/app/home';
        }, 300);
      } else {
        var passwordElement = document.getElementById('password')?.querySelector('input');

        setTimeout(() => {
          passwordElement?.focus();
        }, 0);
      }
    }
  }

  remembermeChange(event: any): void {
    if (this.userEmailAddressIsValid()) {
      if (event.checked) {
        localStorage.setItem('rememberme', event.checked);
        localStorage.setItem('userEmailAddress', this.emailAddress);
        this.rememberme = true;
      } else {
        localStorage.removeItem('rememberme');
        localStorage.removeItem('userEmailAddress');
        this.rememberme = false;
      }
    } else {
      var emailAddressElement = document.getElementById('email');

      setTimeout(() => {
        emailAddressElement?.focus();
        this.rememberme = false;
      }, 0);
    }
  }

  userEmailAddressIsValid(): boolean {
    var emailMask = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    
    this.emailAddress = this.emailAddress.trim();
    
    if (this.emailAddress !== '' && emailMask.test(this.emailAddress)) {
      this.invalidEmailAddress = false;
      return true;
    } else {
      this.invalidEmailAddress = true;
      return false;
    }
  }

  passwordIsValid(): boolean {
    if (this.password !== '') {
      this.invalidPassword = false;
      return true;
    } else {
      this.invalidPassword = true;
      return false;
    }
  }

  isRememberme(): boolean {
    if (localStorage.getItem('rememberme') && localStorage.getItem('rememberme') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  getUserEmailAddress(): string {
    if (this.isRememberme() && localStorage.getItem('userEmailAddress')) {
      return localStorage.getItem('userEmailAddress')!;
    } else {
      return '';
    }
  }
  
  formFieldFocus(): void {
    var emailAddressElement = document.getElementById('email');
    var passwordElement = document.getElementById('password')?.querySelector('input');

    setTimeout(() => {
      if (this.isRememberme()) {
        passwordElement?.focus();
      } else {
        emailAddressElement?.focus();
      }
    }, 0);
  }

  showSuccessViaToast() {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Success Message', detail: 'Message sent' });
  }
  
  autoLogin() {
    var email = [{data: 'd'}, {data: 'a'}, {data: 'n'}, {data: 'i'}, {data: 'e'}, {data: 'l'}, {data: '@'}, {data: 'g'}, {data: 'm'}, {data: 'a'}, {data: 'i'}, {data: 'l'}, {data: '.'}, {data: 'c'}, {data: 'o'}, {data: 'm'}];
    var password = [{data: '1'}, {data: '2'}, {data: '3'}, {data: '4'}, {data: '5'}, {data: '6'}, {data: '7'}, {data: '8'}, {data: '9'}, {data: '0'}];

    var timeout = 2000;
    
    setTimeout(() => {
      for (let i = 0; i < email.length; i++) {
        setTimeout(() => {
          this.emailAddress = this.emailAddress + email[i].data;
        }, i * 100);
      }
    }, timeout);

    setTimeout(() => {
      for (let i = 0; i < password.length; i++) {
        setTimeout(() => {
          this.password = this.password + password[i].data;
          return;
        }, i * 200);
      }
    }, (email.length * 100) + timeout);

    setTimeout(() => {
      this.rememberme = true;
    }, (email.length * 100) + (password.length * 200) + timeout + 500);

    setTimeout(() => {
      this.login();
    }, (email.length * 100) + (password.length * 200) + timeout + 1500);
  }

}

// * * * * * * * * * * * * JS * * * * * * * * * * * * * *

document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "Control") {
    // do not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (e.g., 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the same time.
    // alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    // alert(`Key pressed ${keyName}`);
  }
}, false);
