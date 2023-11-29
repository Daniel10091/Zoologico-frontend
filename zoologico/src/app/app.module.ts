import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { KeycloakService } from 'keycloak-angular';
// import { AppLayoutModule } from './layout/app.layout.module';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://www.keycloak.org/app/#url=http://localhost:8080&realm=Zoologico&client=ZooVida',
        realm: 'Zoologico',
        clientId: 'ZooVida'
      },
      initOptions: {
        onLoad: 'check-sso'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // AppLayoutModule,
    PagesModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [ KeycloakService ]
    // },
    KeycloakService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
