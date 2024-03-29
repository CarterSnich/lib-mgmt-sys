import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: `http://${import.meta.env['NG_APP_HOST_API']}/api/auth/login`,
    register: `http://${import.meta.env['NG_APP_HOST_API']}/api/auth/register`,
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('access_token', token);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    return token;
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('access_token');
  }
}
