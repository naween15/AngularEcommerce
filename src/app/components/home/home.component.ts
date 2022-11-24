import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/_model/product.model';
import { ImageProcessingService } from 'src/app/_services/image-processing-service.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productDetails=[];

  constructor(private productService:ProductService,
              private imageProcessingService:ImageProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[])=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (response:Product[])=>{
        console.log(response);
        this.productDetails=response;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
;  }

        showProductDetails(productId){
          this.router.navigate(['/viewProductDetails',{productId : productId}]);

        }
  }


