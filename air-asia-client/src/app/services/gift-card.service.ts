import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { GiftCard } from '../models/gift-card.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {
  private ENDPOINT = "/gift-cards";
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

  public addGiftCard(giftcard: GiftCard): Observable<GiftCard> {
    return this.httpClient.post<GiftCard>(this.REST_API_SERVER+this.ENDPOINT, giftcard, httpOptions).pipe(
      tap((c: GiftCard) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public updateGiftCard(giftcard: GiftCard): Observable<GiftCard> {
    return this.httpClient.put<GiftCard>(this.REST_API_SERVER+this.ENDPOINT+"/"+giftcard.id, giftcard, httpOptions).pipe(
      tap((c: GiftCard) => console.log(`added card ${c}`)),
      catchError(this.handleError)
    );
  }

  public deleteGiftCard(giftcard: GiftCard): Observable<GiftCard> {
    return this.httpClient.delete<GiftCard>(this.REST_API_SERVER+this.ENDPOINT+"/"+giftcard.id, httpOptions).pipe(
      tap((c: GiftCard) => console.log(`deleted card ${c}`)),
      catchError(this.handleError)
    );
  }

  public getGiftCards(): Observable<GiftCard[]> {
    return this.httpClient.get<GiftCard[]>(`${this.REST_API_SERVER+this.ENDPOINT}`)
      .pipe(
        tap(cards => {
          
          console.log('fetched cases')
        }),
        catchError(this.handleError)
      );
  }
}
