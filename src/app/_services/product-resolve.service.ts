import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing-service.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ):Observable<Product> |Promise<Product>{

    const id=parseInt(route.paramMap.get("productId"));
    if (id) {
       return this.productService.getProductsById(id)
       .pipe(
        map(p=>this.imageProcessingService.createImages(p))
       )
       ;

    }else{

      return of(this.gerProductDetails());
    }

  }

  gerProductDetails(){
    return{
    productId:null,
    productName:"",
    productDescription:"",
    productActualPrice:0,
    productDiscountedPrice:0,
    productImages:[],

    };
  }
}
