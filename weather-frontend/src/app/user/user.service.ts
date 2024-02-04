import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { url } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string, name: string, surname: string, phone: string): Observable<HttpResponse<any>> {
    return this.http.post(url + 'auth/signup',
      { email: email, password: password, name: name, surname: surname, phone: phone },
      { observe: 'response' }
    );
  }

  signIn(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post(url + 'auth/signin',
      { email: email, password: password },
      { observe: 'response' }
    );
  }

  auth(token: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(url + 'auth/profile', {
      headers: headers,
      observe: 'response',
    });
  }

  getUser(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'user/' + id,
      { headers: headers, observe: 'response' });
  }

  updateUser(user: User): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + 'user/' + user.id,
      { user: user },
      { headers: headers, observe: 'response' }
    );
  }

  deleteUser(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + 'user/' + id,
      { headers: headers, observe: 'response' });
  }

  checkPassword(id: string, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'user/compare-password/' + id + '/' + password,
      { headers: headers, observe: 'response' }
    );
  }
}