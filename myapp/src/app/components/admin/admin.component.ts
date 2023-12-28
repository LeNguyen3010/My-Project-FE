import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/category.model";
import { Product } from "src/app/model/product.model";
import { ProductService } from "src/app/services/product.service";
import { PageEvent } from "@angular/material/paginator";
import { Observable } from "rxjs";
import { CategoryService } from "src/app/services/category.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    keyword: new FormControl(),
  });
  currentProduct: Product;
  categoryList: Category[] = [];
  checkSearch = false;
  products: Product[] = [];
  totalPages: number = 0;
  page: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.checkSearch=false;
    this.productService.getProductAdmin(this.page).subscribe(
      (data) => {
        this.products = data["content"];
        this.totalPages = data["totalPages"];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  nextPage() {
    if (!this.checkSearch) {
      this.page = this.page + 1;
      this.getProducts();
      if (this.page === this.totalPages) {
        this.page = this.totalPages - 1;
        this.getProducts();
      }
    } else {
      this.page = this.page + 1;
      this.SearchProducts();
      if (this.page === this.totalPages) {
        this.page = this.totalPages - 1;
        this.SearchProducts();
      }
    }
  }

  previousPage() {
    if ((this.checkSearch = false)) {
      this.page = this.page - 1;
      this.getProducts();
      if (this.page < 0) {
        this.page = 0;
        this.getProducts();
      }
    } else {
      this.page = this.page - 1;
      this.getProducts();
      if (this.page < 0) {
        this.page = 0;
        this.SearchProducts();
      }
    }
  }

  SearchProducts() {
    if (
      this.searchForm.value.keyword == null ||
      this.searchForm.value.keyword == ""
    ) {
      this.page=0;
      this.checkSearch = false;
      this.getProducts();
    }
    else {
      this.checkSearch = true;
      this.productService
        .getProductByName(this.searchForm.value.keyword, this.page)
        .subscribe(
          (data) => {
            this.products = data["content"];
            this.totalPages = data["totalPages"];
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        this.page = 0;
        this.getProducts();
        alert("Xóa thành công");
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getProductId(id: number) {
    this.router.navigate(["updateproduct", id]);
  }

  reset(){
    this.page=0;
    this.getProducts();
    this.checkSearch=false
  }
}
