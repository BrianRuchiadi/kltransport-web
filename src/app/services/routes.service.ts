import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Station } from '../classes/station';

const API_URL = environment.apiUrl;

@Injectable()
export class RoutesService {

  constructor(
    private http: HttpClient
  ) { }

  public getRoutesDetails(stationFrom: Station, stationTo: Station): Observable<any> {
    return this.http.get(API_URL + '/routes/' + stationFrom.id + '/' + stationTo.id + '/details')
      .pipe(
        tap(lines => console.log('getRoutesDetails api called'))
      );
  }
}
