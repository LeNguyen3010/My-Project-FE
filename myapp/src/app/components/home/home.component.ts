import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService:ProductService,
   private router:Router,
   private localStorageService:LocalStorageService) { }

   top4Products: Product[] = [];
   top4NewProducts:Product[]=[];
   cartItems:[];

  ngOnInit() {
    this.getTop4Product();
    this.getTop4NewProduct();
  }

  getTop4Product(){
    this.productService.getTop4Product().subscribe(
      (data) => {
        this.top4Products = data;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
   };

   getTop4NewProduct(){
    this.productService.getTop4NewProduct().subscribe(
      (data) => {
        this.top4NewProducts = data;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
   };

   getProductId(id:number){
    this.router.navigate(['detailproduct',id]);
}
  addToCart(product:Product){
    alert("Thêm vào giở hàng thành công")
    this.localStorageService.addToCart(product)
  }
}
