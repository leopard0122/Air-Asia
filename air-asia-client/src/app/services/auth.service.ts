import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, Subject } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private ENDPOINT = "/user";
  private LOGIN_ENDPOINT = "/api/login";
  private REGISTER_ENDPOINT = "/api/register";
  private PROFILE_ENDPOINT = "/api/profile";
  private LOGOUT_ENDPOINT = "/api/logout";
  private REST_API_SERVER: string;
  public isLoggedIn: boolean = false;
  public currentUser: any;
  public httpOptions: any;
  public currentUserSubject = new Subject<any>();

  constructor(private cookieService: CookieService, private httpClient: HttpClient, private configService: ConfigService) { 
    this.REST_API_SERVER = configService.REST_API_SERVER;
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '})
    };
  }

  setToken(token: any): void{
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '+token})
    };
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(){
    return this.httpClient.get(this.ENDPOINT).pipe(retry(3), catchError(this.handleError));
  }
  
  public getUserProfile() {
    return this.httpClient.get<any>(this.REST_API_SERVER+this.PROFILE_ENDPOINT, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res);
        this.currentUser = res;
        this.currentUserSubject.next(res);
      }),
      catchError(this.handleError)
    );
  }

  public sendRegisterRequest(form: any){
    console.log(form)
    return this.httpClient.post<any>(this.REST_API_SERVER+this.REGISTER_ENDPOINT, form, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res);
        this.isLoggedIn = true;
        this.cookieService.set('user_token', res.data.token)
        this.currentUser = res.data;
        this.httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '+res.data.token})
        };
        this.getUserProfile();
      }),
      catchError(this.handleError)
    );
  }

  public sendLoginRequest(form: any){
    console.log(form)
    return this.httpClient.post<any>(this.REST_API_SERVER+this.LOGIN_ENDPOINT, form, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res);
        this.isLoggedIn = true;
        this.cookieService.set('user_token', res.data.token)
        this.currentUser = res.data;
        this.httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer '+res.data.token})
        };

        this.getUserProfile();
      }),
      catchError(this.handleError)
    );
  }
  public sendLogoutRequest(){
    this.isLoggedIn = false;
    this.cookieService.delete('user_token');
    console.log("did log out")
    this.httpOptions.headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.currentUserSubject.next({id: ''})
    this.currentUser = {id: ''}
    return this.httpClient.post<any>(this.REST_API_SERVER+this.LOGOUT_ENDPOINT, this.httpOptions).pipe(
      tap((res: any) => {
        console.log(res)
        this.isLoggedIn = false;
        this.cookieService.delete('user_token');
        this.currentUser = {}
      }),
      catchError(this.handleError)
    );
  }
}
