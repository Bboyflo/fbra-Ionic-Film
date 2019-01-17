import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiUrl = "http://www.omdbapi.com/?apikey=75522b56";

@Injectable({
  providedIn: 'root'
})
export class ApiOMDbService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getDetails(id: string): Observable<any> {
    const url = `${apiUrl}&i=${id}&plot=full`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  getInfoByTitle(titre: string,type: string,page): Observable<any> {
    const url = `${apiUrl}&s=${titre}&type=${type}&page=${page}`;
    return this.http.get(url).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }
  
  postInfoMovies(data): Observable<any> {
    const url = `${apiUrl}/add_with_students`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateInfoMovies(id: string, data): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, data)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  deleteInfoMovies(id: string): Observable<{}> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
