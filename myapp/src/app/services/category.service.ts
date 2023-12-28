import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string;


  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8080/admin/product/getcategory';
   }

   listCategory() :Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
   }
}
