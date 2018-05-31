import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Fare } from '../classes/Fare';

const API_URL = environment.apiUrl;

@Injectable()
export class FaresService {

  constructor(
    private http: HttpClient
  ) { }

  public getFares(): Observable<Fare[]> {
    return this.http.get<Fare[]>(API_URL + '/fares')
      .pipe(
        tap(fares => console.log('getFares api called'))
      );
  }
}
