import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Category } from "src/app/model/category.model";
import { Product } from "src/app/model/product.model";
import { CategoryService } from "src/app/services/category.service";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-updateproduct",
  templateUrl: "./updateproduct.component.html",
  styleUrls: ["./updateproduct.component.css"],
})
export class UpdateproductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl(null,Validators.required),
    name: new FormControl(null,Validators.required),
    price: new FormControl(null,Validators.required),
    quantity: new FormControl(null,Validators.required),
    category: new FormControl(null,[Validators.required]),
    image:new FormControl(null,Validators.required),
    createDate: new FormControl()
  },{updateOn : 'submit'});
  currentProduct: Product;
  categoryList: Category[] = [];
  sub: Subscription;
  id:number;
  selectedFile: File;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
    this.loadData();
  }

  get name(){
    return this.productForm.controls['name']
  }

  get price(){
    return this.productForm.controls['price']
  }

  get quantity(){
    return this.productForm.controls['quantity']
  }

  get image(){
    return this.productForm.controls['image']
  }

  get category(){
    return this.productForm.controls['category']
  }

  loadData(){
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
       this.id = +paramMap.get("id");
      this.productService.getProductById(this.id).subscribe((result) => {
        this.currentProduct = result;
        this.productForm.setValue({
          id: this.currentProduct.id,
          name: this.currentProduct.name,
          price: this.currentProduct.price,
          quantity:this.currentProduct.quantity,
          image:this.currentProduct.image,
          category:this.currentProduct.category,
          createDate:this.currentProduct.createDate
        });
      });
    });
  }

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  updateProduct() {
    const product: Product = {
      id: this.productForm.value.id,
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      image: this.selectedFile.name,
      quantity:this.productForm.value.quantity,
      createDate:this.currentProduct.createDate,
      category: {
        id: this.productForm.value.category
      }

    };
    this.productService.updateProduct(product).subscribe(() => {
      alert("Sửa thành công");
      this.productForm.reset();
      this.router.navigate(['/admin']);
    },error=>alert("Lỗi update"));
  }

  getCategories() {
    this.categoryService.listCategory().subscribe((result) => {
      this.categoryList = result;
    });
  }
}
