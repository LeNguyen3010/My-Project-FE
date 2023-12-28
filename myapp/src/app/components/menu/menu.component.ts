import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Route, Router } from "@angular/router";
import { Product } from "src/app/model/product.model";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { ProductService } from "src/app/services/product.service";
import { UserAuthService } from "src/app/services/user-auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private localStoregeService: LocalStorageService,
    private productService: ProductService,
    private route: Router
  ) {}

  products: Product[];


  ngOnInit() {
    this.loadFormLocalStorage();
    this.route.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(["/home"]);
  }


  cartItems = [];

  save() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
  }

  remove(id: number) {
    var index = this.cartItems.findIndex((item) => item.id == id);
    this.cartItems.splice(index, 1);
    this.save();
  }
  // clear(){
  //   localStorage.clear();
  // }

  get amount() {
    return this.cartItems
      .map((item) => item.quantity * item.price)
      .reduce((total, quantity) => (total += quantity), 0);
  }

  loadFormLocalStorage() {
    let data = localStorage.getItem("cart");
    this.cartItems = JSON ? JSON.parse(data) : [];
  }

  checkout() {
    let data = localStorage.getItem("cart");
    let email = localStorage.getItem("email");
    if (email == null) {
      this.router.navigate(["/login"]);
    } else if (data == null || data == "[]") {
      alert("Bạn chưa có sản phẩm nào trong giỏ hàng");
    } else {
      this.router.navigate(["/checkout"]);
    }
  }

  getProductId(id: number) {
    this.router.navigate(["detailproduct", id]);
  }

  SearchProducts(keyword: string) {
    if (!keyword) {
      this.products = [];
    } else {
      this.productService.getListProductByName(keyword).subscribe(
        (data) => {
          this.products = data;
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }
  }
}
