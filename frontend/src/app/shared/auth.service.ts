import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

export class User {
  email!: String;
  password!: String;
  fullname!: String;
  password_confirmation!: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(`http://localhost:8000/api/auth/register`, user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8000/api/auth/login`, user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(`http://localhost:8000/api/auth/user-profile`);
  }

  logout(): Observable<any> {
    return this.http.delete('http://localhost:8000/api/auth/logout');
  }
}
