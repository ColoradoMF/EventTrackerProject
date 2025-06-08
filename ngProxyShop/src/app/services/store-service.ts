import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = `${environment.baseUrl}api/stores`;

  private url = environment.baseUrl + 'api/stores';

  constructor(private http: HttpClient,) { }

  index(): Observable<Store[]> {
     return this.http.get<Store[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('StoreService.index(): error retrieving Stores: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<Store> {
    return this.http.get<Store>(`${this.baseUrl}/${id}`)
  }

  create(store: Store): Observable<Store> {
    return this.http.post<Store>(this.baseUrl, store);
  }

  update(store: Store): Observable<Store> {
    return this.http.put<Store>(`${this.baseUrl}/${store.id}`, store)
    .pipe(catchError(this.handleError('update')));
  }

  delete(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }

 private handleError(method: string) {
    return (error: HttpErrorResponse) => {
      console.error(`StoreService.${method}():`, error);
      return throwError(() =>
        new Error(`StoreService.${method}(): error - ${error.message}`)
      );
    };
  }

}
