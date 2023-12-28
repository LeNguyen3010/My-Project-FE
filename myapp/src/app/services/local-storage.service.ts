import { Injectable } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {

  constructor(private productService:ProductService) {}

  cartItems = [];

  addToCart(product: Product) {
    const exist = this.cartItems.find((item) => {
      return item.id === product.id;
    });
    if (exist) {
      exist.quantity++;
      localStorage.setItem("cart",JSON.stringify(this.cartItems));

    } else {
      this.productService.getProductById(product.id).subscribe(
        (data) => {
          data.quantity=1;
          this.cartItems.push(data);
          localStorage.setItem("cart",JSON.stringify(this.cartItems));
        },
        (error) => {
          console.log(error.error.message);
        }
      );
    }
  }
}
