import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/_model/product.model';
import { ImageProcessingService } from 'src/app/_services/image-processing-service.service';
import { ProductService } from 'src/app/_services/product.service';
import { ShowProductImagesDialogueComponent } from '../show-product-images-dialogue/show-product-images-dialogue.component';
@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Description', 'Product Discounted Price','Product Actual Price','Actions'];

  constructor(private productService:ProductService,public dialog:MatDialog,
              private imageProcessingService:ImageProcessingService,
              private router:Router
              ) { }

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

deleteProduct(productId){
  // console.log(element);
  this.productService.deleteProducts(productId).subscribe(
    (response)=>
    { 
      console.log(response);
      this.getAllProducts();
      
    },
    (error)=>{
      console.log(error);
    
    }
  );
   
}  

showPopup(product:Product){
console.log(product);
this.dialog.open(ShowProductImagesDialogueComponent,{
  data:{
    images:product.productImages
  },
  height:'500px',
  width:'500px',
});

}
editProduct(productId){
  console.log(productId);
  this.router.navigate(['/addNewProduct',{productId:productId}]);
  
}

}
