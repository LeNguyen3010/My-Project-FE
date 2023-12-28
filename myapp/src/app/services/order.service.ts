import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order.model';
import { OrderDetail } from '../model/orderDetail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8080/home/order';
   }

   addOrder(order:any){
    return this.http.post(this.baseUrl+"/add",order);
  }

  getOrderByUserId(userId:number): Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl+"/get-order-by-user"+"/"+userId)
  }

  getOrderDetailByOrderId(orderId:number): Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(this.baseUrl+"/get-order-detail-by-order"+"/"+orderId)
  }

  getOrder(page: number = 0) :Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl+'/find-all?page='+page);
   }

   updateOrder(order: Order){
    return this.http.put<Order>(this.baseUrl +"/update-order",order);
  }

}
