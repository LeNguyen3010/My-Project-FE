import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor( private orderService:OrderService,
    private productService:ProductService,
    private router:Router ) { }

  ngOnInit() {
    this.loadFormLocalStorage();
  }

  address:string='';
  phoneNumber:string='';
  cartItems=[];
  email:string;
  currentDate = new Date();

  loadFormLocalStorage(){
    let email =localStorage.getItem('email');
    let data = localStorage.getItem('cart');
    this.cartItems = JSON ? JSON.parse(data):[];
    this.email = email;
  }

  get amount(){
    return this.cartItems
        .map(item => item.quantity * item.price)
        .reduce((total,quantity)=>total += quantity,0);
  }


  purchase() {
    if(this.address === "" || this.phoneNumber === ""){}
    else{
    const order = {
      createDate: new Date(),
      address:this.address,
      phoneNumber:this.phoneNumber,
      user:{id:localStorage.getItem('id')} ,
      orderDetails:this.cartItems.map(item => {
        this.productService.updateByOrder(item.id).subscribe((data) => {
          console.log(data)
        },error=>(error) => {
        });
          return {
              product: { id: item.id },
              price: item.price,
              quantity: item.quantity,
              image:item.image
          }
      })
    };
      //Thuc hien dat hang

      this.orderService.addOrder(order).subscribe(() => {
        alert("Thêm thành công");
        localStorage.removeItem('cart');
        this.router.navigate(['/order']);
      },error=>(error) => {
      });
}
}
}


