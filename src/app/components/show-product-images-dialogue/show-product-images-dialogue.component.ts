import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fileHandle } from 'src/app/_model/fileHandle.model';

@Component({
  selector: 'app-show-product-images-dialogue',
  templateUrl: './show-product-images-dialogue.component.html',
  styleUrls: ['./show-product-images-dialogue.component.css']
})
export class ShowProductImagesDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
    this.receiveImages();
  }
  public receiveImages()
{
  console.log(this.data);
  
}
}
