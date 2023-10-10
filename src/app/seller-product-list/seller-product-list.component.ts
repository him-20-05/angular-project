import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { NgForm } from '@angular/forms'; // Import NgForm

@Component({
  selector: 'app-seller-product-list',
  templateUrl: './seller-product-list.component.html',
  styleUrls: ['./seller-product-list.component.css'],
})
export class SellerProductListComponent {
  addProductMessage: string | undefined;

  // Use ViewChild to access the form
  @ViewChild('addProduct', { static: false }) addProductForm!: NgForm;

  constructor(private productService: ProductService) {}

  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addProductMessage = 'Product is successfully added';

        // Reset the form after success
        this.addProductForm.resetForm();
      }
    });

    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
