import { ItemToBuy } from '../models/item';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemToBuyService {

    private url = environment.baseUrl + 'api/items';
  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<ItemToBuy[]> {
       return this.http.get<ItemToBuy[]>(this.url).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error('ItemToBuyService.index(): error retrieving ItemsToBuy: ' + err)
          );
        })
      );
    }
}
