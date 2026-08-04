import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  AuthResponse,
  LoginDto,
  RegisterDto,
  User,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  currentuser = signal<User | null>(null);

  register(body: RegisterDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/auth/register', body)
      .pipe(tap((res) => this.setSession(res)));
  }

  login(body: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/auth/login', body)
      .pipe(tap((res) => this.setSession(res)));
  }

  logOut(): void {
    localStorage.removeItem('accessToken');
    this.currentuser.set(null);
  }

  private setSession(authResult: AuthResponse): void {
    if (authResult?.accessToken) {
      localStorage.setItem('accessToken', authResult.accessToken);
      this.currentuser.set(authResult.user);
    }
  }
}
