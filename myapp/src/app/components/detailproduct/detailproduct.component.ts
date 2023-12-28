import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Product } from 'src/app/model/product.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  constructor(private productService:ProductService,
    private activatedRoute: ActivatedRoute ,
    private router:Router,
    private localStorageService:LocalStorageService) {}

  product: Product;
  sub: Subscription;
  id:number;
  top4Products: Product[] = [];

  ngOnInit() {
    this.getProductById();
    this.getTop4Product();
  }

  getProductById() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get("id");
      this.productService.getProductById(this.id).subscribe(
        (data) => {
          this.product = data;
        },
        (error) => {
          console.log(error.error.message);
        }
      );
     });
   };

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

   getProductId(id:number){
    this.router.navigate(['detailproduct',id]);
  }

  addToCart(product:Product){
    this.productService.getProductById(this.id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        console.log(error.error.message);
      }
    );

    if(product.quantity==1){
      alert("Sản phẩm hiện đang hết hàng")
    }
    else{
    alert("Thêm giỏ hàng thành công");
    this.localStorageService.addToCart(product);
    }
  }

}
