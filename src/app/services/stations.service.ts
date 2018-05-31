import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Line } from '../classes/line';

const API_URL = environment.apiUrl;

@Injectable()
export class StationsService {

  constructor(
    private http: HttpClient
  ) { }

  public getStations(): Observable<Line[]> {
    return this.http.get<Line[]>(API_URL + '/stations')
      .pipe(
        tap(lines => console.log('getStations api called'))
      );
  }
}
