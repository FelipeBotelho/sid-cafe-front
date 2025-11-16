import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'sid_cafe_auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.getStoredAuthState());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router) {}

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private getStoredAuthState(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.AUTH_KEY) === 'true';
    }
    return false;
  }

  private setStoredAuthState(isAuthenticated: boolean): void {
    if (typeof localStorage !== 'undefined') {
      if (isAuthenticated) {
        localStorage.setItem(this.AUTH_KEY, 'true');
      } else {
        localStorage.removeItem(this.AUTH_KEY);
      }
    }
  }

  login(): void {
    // Em uma aplicação real, isso envolveria validação de token, etc.
    this.isAuthenticatedSubject.next(true);
    this.setStoredAuthState(true);
    this.router.navigate(['/admin/dashboard']);
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    this.setStoredAuthState(false);
    this.router.navigate(['/admin/login']);
  }
}