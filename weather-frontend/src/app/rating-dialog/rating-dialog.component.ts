import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent {

  numberOfProducts: number = 1;
  products: number[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  productRatings: { [key: number]: number } = {};

  constructor(
    public dialogRef: MatDialogRef<RatingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numberOfProducts: number }
    ) { 
      this.numberOfProducts = data.numberOfProducts;
    }

  ngOnInit(): void {
    console.log(this.numberOfProducts);
    for (let i = 0; i < this.numberOfProducts; i++) {
      this.products.push(i);
      this.productRatings[i] = 0;
    }
  }

  highlightStars(productIndex: number, starIndex: number) {
    this.productRatings[productIndex] = starIndex + 1;
  }

  rate(productIndex: number, starIndex: number) {
    this.productRatings[productIndex] = starIndex + 1;
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
