import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  isLogged = signal<boolean>(false);

  signOut(): void {
    localStorage.removeItem('token');
    this.isLogged.set(false);
    this.router.navigate(['/login']);
  }

  signUp(data: {}): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signup`, data);
  }

  signIn(data: {}): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signin`, data);
  }

  //change password

  changePassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/forgotPasswords`, data);
  }

  sendCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/verifyResetCode`, data);
  }

  updatePassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/users/changeMyPassword`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/auth/resetPassword`, data);
  }

  addAddress(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/addresses`, data);
  }

  getUserAddresses(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/addresses`);
  }

  deletAddress(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/api/v1/addresses/${id}`);
  }

  updateUserData(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/users/updateMe/`, data);
  }

  changeCurrPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/users/changeMyPassword`, data);
  }
}
