import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly API = `${environment.apiURLBase}/animal`;

  keycloak = inject(KeycloakService);
  
  userIsLoggedIn: boolean = false;

  constructor() {
    this.loadUserProfileIfLoggedIn();
  }

  async loadUserProfileIfLoggedIn() {
    try {
      const loggedIn = await this.keycloak.isLoggedIn();
      
      if (loggedIn) {
        await this.keycloak.getKeycloakInstance().loadUserProfile();
      }
    } catch (error) {
      console.error("Error checking login status or loading user profile:", error);
      // Tratar o erro conforme necessário
    }
  }
  
  public logout(): void {
    this.keycloak.logout("http://localhost:4200/login").then();
  }

  login() {
    this.keycloak.login({redirectUri: "http://localhost:4200/app/inicio"}).then();
  }

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
    return this.keycloak.getKeycloakInstance()?.profile?.username as string;
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  getTokenExpirationDate(): number {
    return (this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number })['exp'] as number;
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }
  
}
