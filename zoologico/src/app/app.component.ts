import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AuthService ]
})
export class AppComponent implements OnInit {
  
  title: string = 'zoologico';

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
