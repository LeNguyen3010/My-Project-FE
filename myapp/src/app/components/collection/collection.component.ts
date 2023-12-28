import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  filterForm: FormGroup = new FormGroup({
    price: new FormControl(),
  });

  currentProduct: Product;
  categoryList: Category[] = [];
  products: Product[] = [];
  totalPages: number = 0;
  page: number = 0;
  price:number;
  sortType:number;
  categoryId:number;
  cartItems = [];

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router:Router,
    private localStoregeService:LocalStorageService) {}

  ngOnInit() {
    this.getProducts(0,0,1);
    this.getCategories();
  }

  getCategories() {
    this.categoryService.listCategory().subscribe((result) => {
      this.categoryList = result;
    });
  }

  getProducts(price:number,categoryId:number,sortType:number) {
    this.productService.getProduct(this.page,price,categoryId,sortType).subscribe(
      (data) => {
        this.categoryId=categoryId;
        this.price=price;
        this.sortType=sortType;
        this.products = data["content"];
        this.totalPages = data["totalPages"];
        console.log(this.products)
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
  nextPage() {
    this.page = this.page + 1;
      this.getProducts(this.price,this.categoryId,this.sortType);
      if (this.page === this.totalPages) {
        this.page = this.totalPages - 1;
        console.log(this.page)
        this.getProducts(this.price,this.categoryId,this.sortType);
      }
  }

  previousPage() {
    if(this.page == 0){
      this.getProducts(this.price,this.categoryId,this.sortType);
    }
    else{
      this.page = this.page - 1;
      this.getProducts(this.price,this.categoryId,this.sortType);
    }
  }

  getProductId(id:number){
    this.router.navigate(['detailproduct',id]);
}


  getAllProduct(){
    this.page=0;
    this.getProducts(0,0,1);
  }

  // addToCart(product: Product) {
  //   alert("Thêm vào giỏ hàng thành công")
  //   this.localStoregeService.addToCart(product)
  // }


   // getProductByCategory(id:number){
  //   this.categoryId=id;
  //   this.checkCategory=true
  //   this.checkFilterPrice=false
  //   console.log(this.checkCategory)
  //   this.productService
  //   .getProductByCategory(id, this.page)
  //   .subscribe(
  //     (data) => {
  //       this.products = data["content"];
  //       this.totalPages = data["totalPages"];
  //     },
  //     (error) => {
  //       console.log(error.error.message);
  //     }
  //   );

  // }

  // SearchProductByPrice(price: any) {
  //   if (price == null ||price == 0) {
  //     this.page=0;
  //     this.getProducts();
  //   }
  //   else {
  //     this.checkCategory=false;
  //     this.price=price;
  //     this.checkFilterPrice=true;
  //     this.productService
  //       .getProductByPrice(price,this.page)
  //       .subscribe(
  //         (data) => {
  //           this.products = data["content"];
  //           this.totalPages = data["totalPages"];
  //         },
  //         (error) => {
  //           console.log(error.error.message);
  //         }
  //       );
  //   }
  // }

}
