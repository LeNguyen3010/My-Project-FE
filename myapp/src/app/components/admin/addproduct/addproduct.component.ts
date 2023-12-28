import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productForm: FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    price: new FormControl(null,[Validators.required]),
    category: new FormControl(null,[Validators.required]),
    image: new FormControl(null,[Validators.required]),
    quantity: new FormControl(null,[Validators.required]),
    createDate: new FormControl()
  },{updateOn : 'submit'});
  categoryList: Category[] = [];
  selectedFile: File;

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router:Router) {
  }

  ngOnInit() {
    this.getCategories();
  }



  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
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

  get createDate(){
    return this.productForm.controls['createDate']
  }

  addProduct() {
    if(!this.productForm.valid){
    }
    else{
    const product: Product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      image:  this.selectedFile.name,
      quantity:this.productForm.value.quantity,
      createDate: new Date(),
      category: {
        id: this.productForm.value.category
      }

    };
    this.productService.addProduct(product).subscribe(() => {
      alert("Thêm thành công");
      console.log(product)
      this.productForm.reset();
    },error => alert("Thêm tài khoản thật bại"));
  }
  }

  getCategories() {
    this.categoryService.listCategory().subscribe((result) => {
      this.categoryList = result;
    });
  }

}
