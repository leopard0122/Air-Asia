import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { Redemption } from '../models/redemption.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RedemptionService {
  private ENDPOINT = "/redemptions";
  private REST_API_SERVER = "http://localhost:8000/api";
  private apiUrl: String = this.REST_API_SERVER+this.ENDPOINT;

  constructor(private http: HttpClient) {

  }

  public handleError(error: HttpErrorResponse) {
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
    return this.http.get(this.REST_API_SERVER+this.ENDPOINT).pipe(retry(3), catchError(this.handleError));
  }

  public getRedemption(): Observable<Redemption[]> {
    return this.http.get<Redemption[]>(`${apiUrl}`)
      .pipe(
        tap(cases => console.log('fetched cases')),
        catchError(this.handleError('getCases', []))
      );
  }

  public getRedemptionsById(id: string): Observable<Redemption> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Redemption>(url).pipe(
      tap(_ => console.log(`fetched cases id=${id}`)),
      catchError(this.handleError<Redemption>(`getCasesById id=${id}`))
    );
  }

  public addRedemption(cases: Redemption): Observable<Redemption> {
    return this.http.post<Redemption>(apiUrl, cases, httpOptions).pipe(
      tap((c: Redemption) => console.log(`added cases w/ id=${c._id}`)),
      catchError(this.handleError<Redemption>('addCases'))
    );
  }

  public updateRedemption(id: string, cases: Redemption): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cases, httpOptions).pipe(
      tap(_ => console.log(`updated cases id=${id}`)),
      catchError(this.handleError<any>('updateCases'))
    );
  }

  public deleteRedemption(id: string): Observable<Redemption> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Redemption>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted cases id=${id}`)),
      catchError(this.handleError<Redemption>('deleteCases'))
    );
  }


}
