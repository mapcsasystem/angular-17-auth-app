import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { environment } from '../../../environments/environment.development';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkToken().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = {
      email,
      password,
    };
    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ token, user }) => this.setAuthentication(user, token)),
      catchError((err) => {
        return throwError(() => {
          localStorage.clear();
          return err.error.statusCode;
        });
      })
    );
  }

  checkToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.clear();
      this.logout();
      return of(false);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ token, user }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        localStorage.clear();
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }
}
