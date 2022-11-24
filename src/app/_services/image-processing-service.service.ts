import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fileHandle } from '../_model/fileHandle.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product:Product){  

   const productImages:any[]= product.productImages;
  const productImagesToFileHandle:fileHandle[]=[];
  for(let i=0;i<productImages.length;i++){
    const imageFileData=productImages[i];
    const imageBlob=this.dataURIToBlob(imageFileData.picByte , imageFileData.type);
    const imageFile=new File([imageBlob],imageFileData.productName,{type:imageFileData.type});
    const finalFileHandle:fileHandle={
      file:imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
    };
     
    productImagesToFileHandle.push(finalFileHandle);
  }


  product.productImages= productImagesToFileHandle;
  return product;
  }

  public dataURIToBlob(picBytes,imageType){
    const byteString=window.atob(picBytes);
    const arrayBuffer=new ArrayBuffer(byteString.length);
    const int8Array =new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
     int8Array[i]= byteString.charCodeAt(i);
    }
   const blob= new Blob([int8Array],{type:imageType});
   return blob;
  }
}
