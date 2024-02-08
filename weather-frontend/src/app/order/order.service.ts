import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { url } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(url + 'order/',
      { order: order },
      { headers: headers, observe: 'response' });
  }

  getTotalNumberOfOrders(userId: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'order/total' + '?userId=' + userId,
      { headers: headers, observe: 'response' });
  }

  getOrdersByPageIndexPageSize(pageIndex: number, pageSize: number, userId: string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get(url + 'order' + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize + '&userId=' + userId,
      { headers: headers, observe: 'response' });
  }

  rateOrder(orderId: string, ratings: number[]): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(url + 'order/rate/' + orderId,
      { ratings: ratings },
      { headers: headers, observe: 'response' });
  }
}
