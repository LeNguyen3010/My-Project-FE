import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-ordermanager',
  templateUrl: './ordermanager.component.html',
  styleUrls: ['./ordermanager.component.css']
})
export class OrdermanagerComponent implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  orders: Order[] = [];
  totalPages: number = 0;
  page: number = 0;

  getOrders() {
    this.orderService.getOrder(this.page).subscribe(
      (data) => {
        this.orders = data["content"];
        this.totalPages = data["totalPages"];
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  browerOrder(order:Order){
    order.status=true;
    console.log(order)
    this.orderService.updateOrder(order).subscribe(
      (data) => {
        this.getOrders()
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  nextPage() {
      this.page = this.page + 1;
      this.getOrders();
      if (this.page === this.totalPages) {
        alert("Hiện đang ở trang cuối cùng");
        this.page = this.totalPages - 1;
        this.getOrders();
      }
  }

  previousPage() {
      if(this.page == 0){
        alert("Hiện đang ở trang đầu tiên");
        this.getOrders();
      }
      else{
        this.page = this.page - 1;
        this.getOrders();
      }

  }
}

