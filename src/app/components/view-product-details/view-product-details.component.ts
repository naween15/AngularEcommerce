import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/_model/product.model';

@Component({
  selector: 'app-view-product-details',
  templateUrl: './view-product-details.component.html',
  styleUrls: ['./view-product-details.component.css']
})
export class ViewProductDetailsComponent implements OnInit {
  product:Product;
  selectedImageIndex=0;

  constructor(private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  changeIndex(i){
    this.selectedImageIndex=i;
  }

  buyProduct(){
    this.router.navigate(['/buyProduct']);
  }
}
