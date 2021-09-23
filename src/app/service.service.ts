import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from './models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  games!:Game;

  constructor(private http:HttpClient) { }

  getGameList(ordering:string, search?:string):Observable<APIResponse<Game>>{
    let params= new HttpParams().set('ordering', ordering).set('key', env.API_Key );

    if (search){
      params = new HttpParams().set('ordering', ordering).set('search', search).set('key', env.API_Key);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}`,{params});
   
  }

  getGameDetails(id:number):Observable<Game>{
  
    const gameInfoRequest = this.http.get<Game>(`${env.BASE_URL}/${id}?key=${env.API_Key}`);
    const gameTrailersRequest=this.http.get<Game>(`${env.BASE_URL}/${id}/movies?key=${env.API_Key}`);
    const gameScreenShotsRequest=this.http.get<Game>(`${env.BASE_URL}/${id}/screenshots?key=${env.API_Key}`);


    return forkJoin({
      gameInfoRequest,
      gameScreenShotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  
  }

  

}

