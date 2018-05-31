import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Line } from '../classes/line';

const API_URL = environment.apiUrl;

@Injectable()
export class LinesService {

  constructor(
    private http: HttpClient
  ) { }

  public getLines(): Observable<Line[]> {
    return this.http.get<Line[]>(API_URL + '/lines')
      .pipe(
        tap(lines => console.log('getLines api called'))
      );
  }
}
