import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface User {
  email: string;
  nombre: string;
  apellido: string;
  role: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);
  private http = inject(HttpClient);

  constructor() {
    const token = localStorage.getItem('token');

    if (token) {
      this._token.set(token);
      this._authStatus.set('authenticated');
    } else {
      this._authStatus.set('not-authenticated');
    }
  }

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }
    if (this._user()) {
      return 'authenticated';
    }
    return 'not-authenticated';
  });

  user = computed(() => this._user());
  token = computed(() => this._token());

  postLogin(email: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>(`${baseUrl}/auth/login`, { email, password }).pipe(
      tap((resp) => {
        this._user.set(resp.user);
        this._token.set(resp.token);
        this._authStatus.set('authenticated');

        localStorage.setItem('token', resp.token);
      }),
      map(() => true),
      catchError((error: any) => {
        this._user.set(null);
        this._token.set(null);
        this._authStatus.set('not-authenticated');
        return of(false);
      })
    );
  }
}
