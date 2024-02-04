import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../environment/environment';
import { CompanyUser } from './company-user.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompany(id: number): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'company/' + id,
      { headers: headers, observe: 'response' });
  }

  updateCompany(companyUser: CompanyUser): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + 'company/' + companyUser.id,
      { CompanyUser: companyUser },
      { headers: headers, observe: 'response' }
    );
  }

  deleteCompany(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + 'company/' + id,
      { headers: headers, observe: 'response' });
  }

  checkPassword(id: string, password: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'company/compare-password/' + id + '/' + password,
      { headers: headers, observe: 'response' }
    );
  }
}
