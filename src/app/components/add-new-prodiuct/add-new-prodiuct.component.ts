import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { fileHandle } from 'src/app/_model/fileHandle.model';
import { Product } from 'src/app/_model/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-new-prodiuct',
  templateUrl: './add-new-prodiuct.component.html',
  styleUrls: ['./add-new-prodiuct.component.css']
})
export class AddNewProdiuctComponent implements OnInit {
  isNewProduct=true;
  product:Product={
    productId : null,
    productName :"",
    productDescription:"",
    productActualPrice:0,
    productDiscountedPrice:0,
    productImages:[]
  }

  constructor(private productService:ProductService,
              private sanitizer:DomSanitizer,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
    if(this.product && this.product.productId){
      this.isNewProduct=false;
    }
  }

  newProductSubmit(productForm:any){
    console.log(this.product);
   const productFormData= this.prepareFormData(this.product);
    this.productService.addProduct(productFormData)
    .subscribe(
      (response)=>{
        console.log(response);
        productForm.reset();
        this.product.productImages=[];
        
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
        
      }

    );
  }

  prepareFormData(product:Product):FormData{
    const formData=new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)],{type:'application/json'})
    );
    for(var i=0;i<product.productImages.length;i++){
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name

      );
    }
    return formData;
  }
  onFileSelected(event:any){
    console.log("hello");
    const file=event.target.files[0];
    
    const fileHandle:fileHandle={
      file:file,
      url:this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
        )
      
    }
    this.product.productImages.push(fileHandle);

    
  }
  removeImage(i:number){
    this.product.productImages.splice(i,1);

  }
  clear(productForm:any){
    productForm=this.product;
  }

  fileDropped(fileHandle:fileHandle){
    this.product.productImages.push(fileHandle);
  }


}

