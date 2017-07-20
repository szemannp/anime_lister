///<reference path="../../../node_modules/@angular/http/src/http.d.ts"/>
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';


@Injectable()
export class SearchService {

  accessToken: any;

  constructor(private http: Http) {
  }

  private getAccessToken(): Observable<any> {
    // To be honest I don't understand how it does what it does:
    // https://github.com/thelgevold/angular-2-samples/tree/master/components/rxjs-caching
    // but it's doing it succesfully, calling auth endpoint just once

    if (!this.accessToken) {
      this.accessToken = this.http.post('https://anilist.co/api/auth/access_token', {
        grant_type: 'client_credentials',
        client_id: 'kissbela-gwlwg',
        client_secret: 'ksrTE3zlzuE7cMMoWuES0'
      }).map(res => res.json())
        .publishReplay(1)
        .refCount();
    }

    return this.accessToken;
  }

  private createAccessTokenHeader(tokenMap): Headers {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${ tokenMap.access_token }`);
    return headers;
  }

  getSearchData(searchTerm: string): Observable<Response> {
    // mergeMap can be used to wait out the result of the first stream (which is authentication)
    // and only start the second after it.

    // TODO: some kind of error handling?
    return this.getAccessToken().mergeMap((token) => {
      return this.http.get(`https://anilist.co/api/anime/search/${searchTerm}`, { headers: this.createAccessTokenHeader(token) });
    });
  }
}
