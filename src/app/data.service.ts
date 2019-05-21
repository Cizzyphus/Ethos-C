import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';;
import { Games } from '../app/games/models/game.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import * as moment from "moment";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':localStorage.getItem('token')
  })
}

@Injectable({
  providedIn: 'root'
})


export class DataService {
  private GamesUrl = 'http://localhost:3005/games';
  private dbAuthUrl = 'http://localhost:3005/auth/login';
  private dbAuthSignUpUrl = 'http://localhost:3005/auth/create';

  constructor(private http: HttpClient) { }

  // const expiresAt = JSON.parse(expiration);
  getGame(name: number) : Observable<Games[]> {
    return this.http.get<Games[]>(`${this.GamesUrl}/${name}`, httpOptions);
  }

  getGames() : Observable<Games[]> {
    return this.http.get<Games[]>(`${this.GamesUrl}/viewgames`);
  }
  gamecreate(game: any) : Observable<Games> {
    return this.http.post<any>( `${this.GamesUrl}/addgame`, game, httpOptions )
  }
  gameedit(game: any, name: string) : Observable<Games> {
    return this.http.put<any>( `${this.GamesUrl}/editgame/${name}`, game, httpOptions )
  }

  deleteGame(name: any) : Observable<Games> {
    const deleteGamesUrl = `${this.GamesUrl}/xgame/${name}`;
    // console.log(deleteGamesUrl);
    return this.http.delete<Games>(deleteGamesUrl, httpOptions);
  }
  // loginUser(user) {
  //   return this.http.post<any>(this.dbAuthUrl, user)
  //     .pipe(map(user => {
  //        if (user && user.token) {
  //           localStorage.setItem('token', user.token);
  //           // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf( 60 * 60 * 24)) );
  //        }
  //        return user;
  //     }));
  //   }
    logoutUser() {
     localStorage.removeItem('token');
  }

  getExpiration() {
    const expiration =localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}    

signupUser(user: any) {
  return this.http.post<any>(this.dbAuthSignUpUrl, user)
  .pipe(map(user => {
     if (user && user.sessionToken) {
        sessionStorage.setItem('token', user.sessionToken);
        sessionStorage.setItem('uid', user.id);
        sessionStorage.setItem('name', user.user.name);
        sessionStorage.setItem('img', user.user.image);
        localStorage.setItem('token', user.sessionToken);
        localStorage.setItem('uid', user.id);
        localStorage.setItem('name', user.user.name);
        localStorage.setItem('img', user.user.image);
       };
     return user;
  }));
}

loginUser(user: any) {
  return this.http.post<any>(this.dbAuthUrl, user)
  .pipe(map(user => {
     if (user && user.sessionToken) {
        sessionStorage.setItem('token', user.sessionToken);
        sessionStorage.setItem('uid', user.user.id);
        sessionStorage.setItem('name', user.user.name);
        sessionStorage.setItem('img', user.user.image);
        localStorage.setItem('token', user.sessionToken);
        localStorage.setItem('uid', user.user.id);
        localStorage.setItem('name', user.user.name);
        localStorage.setItem('img', user.user.image);
       };
     return user;
  }));
}
}

  