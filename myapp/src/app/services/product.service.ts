import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8080/admin/product';
   }

   getProduct(page: number = 0,price:number,categoryId:number,sortType:number) :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/collection?page='+page+"&price="+price+"&categoryId="+categoryId+"&sortType="+sortType);
   }

   getProductAdmin(page: number = 0) :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/get-all-product-by-admin?page='+page);
   }

   getProductById(id: number): Observable<any>{
    return this.http.get(this.baseUrl +"/"+ id);
   }

   getProductByName(name: string,page:number = 0): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl +"/search/"+name+"?page="+page);
   }

   getListProductByName(name: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl +"/search?name="+name);
   }

   addProduct(product: Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl+"/add",product);
  }
  updateProduct(product: Product): Observable<Product>{
    return this.http.put<Product>(this.baseUrl +"/update", product);
  }

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(this.baseUrl+"/delete/" + id);
  }

  getTop4Product() :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/top-4-bestseller");
   }

   getTop4NewProduct() :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+"/top-4-new-product");
   }

   updateByOrder(id:number):Observable<Product>{
    return this.http.get<Product>(this.baseUrl +"/update-by-order/"+id);
   }


}
