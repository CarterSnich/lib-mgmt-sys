import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}
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
}
