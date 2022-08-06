import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Account } from '../models/account.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private ENDPOINT = "/accounts";
  private REST_API_SERVER = "http://localhost:8000/api";

  constructor(private httpClient: HttpClient) { }

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


  public add(item: any): Observable<any> {
    return this.httpClient.post<any>(this.REST_API_SERVER+this.ENDPOINT, item, httpOptions).pipe(
      tap((c: any) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public update(item: any): Observable<any> {
    return this.httpClient.put<any>(this.REST_API_SERVER+this.ENDPOINT+"/"+item.id, item, httpOptions).pipe(
      tap((c: any) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public delete(item: any): Observable<any> {
    return this.httpClient.delete<any>(this.REST_API_SERVER+this.ENDPOINT+"/"+item.id, httpOptions).pipe(
      tap((c: any) => console.log(`deleted card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.REST_API_SERVER+this.ENDPOINT}`)
      .pipe(
        tap(cards => {
          
          console.log('fetched cases')
        }),
        catchError(this.handleError)
      );
  }

  public getBy(id: number): Observable<any> {
    return this.httpClient.get<any>(this.REST_API_SERVER+this.ENDPOINT+"/"+id, httpOptions).pipe(
      tap((c: any) => console.log(`got card ${c}`)),
      catchError(this.handleError)
    );
  }

}
