import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  public addProduct(product:FormData){
    return this.http.post<Product>("http://localhost:8080/product/add",product);
  }

  public getAllProducts(){
    return this.http.get<Product[]>("http://localhost:8080/getall");
  }

  public deleteProducts(id:number){
    return this.http.delete<Product>("http://localhost:8080/deleteProductDetails/"+id);
  }

  public getProductsById(id:number){
    return this.http.get<Product>("http://localhost:8080/getProductById/"+id);
  }
}
