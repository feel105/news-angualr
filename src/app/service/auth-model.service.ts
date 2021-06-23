import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from 'src/app/interface/auth';
import { Author } from '../model/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthModelService {
  private currentAuthorSubject: BehaviorSubject<Author>;
  public currentAuthor: Observable<Author>;
  //Set Init Value of Author
  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentAuthor');
    const AuthorJson = userJson !== null ? JSON.parse(userJson) : new Author();
    this.currentAuthorSubject = new BehaviorSubject<Author>(AuthorJson);
    this.currentAuthor = this.currentAuthorSubject.asObservable();
  }

  /**Get Currect AthorValue */
  public get currentAuthorValue(): Author {
    return this.currentAuthorSubject.value;
  }

  login(userInfo: Auth) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, userInfo)
      .pipe(
        map((user: Author) => {
          console.log(user, ' use ', user.authToken);
          if (user.authToken) {
            // store user details and jwt token
            localStorage.setItem('currentAuthor', JSON.stringify(user));
            //send next for other use
            this.currentAuthorSubject.next(user);
          }
          return user;
        })
      );
  }

  register(userInfo: Auth) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/signUp`, userInfo)
      .pipe(
        map((user: Author) => {
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentAuthor');
    const AuthorJson = new Author();
    this.currentAuthorSubject.next(AuthorJson);
  }
}
