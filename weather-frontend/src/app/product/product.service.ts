import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../environment/environment';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + 'product',
      { product: product },
      { headers: headers, observe: 'response' }
    );
  }

  getProduct(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'product/' + id,
      { headers: headers, observe: 'response' });
  }

  getProductsByPageIndexPageSize(pageIndex: number, pageSize: number, companyId: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'product' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&companyId=' + companyId,
      { headers: headers, observe: 'response' });
  }

  getTotalNumberOfProducts(companyId: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'product/total' + '?companyId=' + companyId,
      { headers: headers, observe: 'response' });
  }

  updateProduct(product: Product): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + 'product/' + product.id,
      { product: product },
      { headers: headers, observe: 'response' }
    );
  }

  deleteProduct(id: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete(url + 'product/' + id,
      { headers: headers, observe: 'response' });
  }
}
