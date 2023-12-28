import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderDetail } from 'src/app/model/orderDetail.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor( private orderService:OrderService,
    private router:Router) { }

    ngOnInit() {
      this.getOrderByUserId()
  }

  userId=localStorage.getItem('id');
  orders: Order[];
  orderDetails: OrderDetail[];


  getOrderByUserId(){
    this.orderService
    .getOrderByUserId(Number.parseInt(this.userId))
    .subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  getOrderDetailByOrderId(orderid:number){
    this.orderService
    .getOrderDetailByOrderId(orderid)
    .subscribe(
      (data) => {
        this.orderDetails = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
