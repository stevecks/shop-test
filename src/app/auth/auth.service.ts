import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from './interfaces/login-model'; 
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationModel } from './interfaces/registration-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthorized: boolean = false;
  private _accessToken: string = '';
  private _user: string = '';
  public _userName: string = '';
  public _userEmail: string = '';

  constructor(
    //private router: Router,
    private httpClient: HttpClient
  ) { }

  public get accessToken(): string {
    return this._accessToken;
  }

  public get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  public get isNotAuthorized(): boolean {
    return !this._isAuthorized;
  }

  public register(model: RegistrationModel): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
    return this.httpClient.post(environment.apiUrl + 'Authorization/registration', JSON.stringify(model), {
      headers: headers
    })
  }

  public login(model: LoginModel): Observable<any> {
    let headers = new HttpHeaders({ ['Content-Type']: 'application/json' });
    //this._isAuthorized = true;
    //console.log('aaaaaaa');
    return this.httpClient.post<any>(environment.apiUrl + 'Authorization/login', JSON.stringify(model), {
      headers: headers
    }).pipe(
        tap({
          next: result => {
            this._accessToken = result.token;
            //this.parseUserName();
            this._isAuthorized = true;
            //console.log('aaaaaaa');
          }, 
          error: _ => {
            //console.log('aaaaaaa');
            this._accessToken = '';
            this._user = '';
            this._userName = '';
            this._userEmail = '';
          }
        })
      );
      ////////// ?????????????
  }

  public logout(): void {
    this._isAuthorized = false;
    this._user = '';
    this._userName = '';
    this._userEmail = '';
    //this.router.navigate(['/']);
  }

  private parseUserName(): void {
    let payload = this._accessToken.split(".")[1];
    let authDataString = atob(payload);
    let authData = JSON.parse(authDataString);
    //this._user = `${authData.name} <${authData.email}>`;
    //this._userName = `${authData.name}`;
    //this._userEmail = `${authData.email}`;
    //console.log(this._user);
    //console.log(this._userName);
    //console.log(this._userEmail);
    //console.log(this._accessToken);
  }


}
