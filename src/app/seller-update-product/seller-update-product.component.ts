import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  productData : undefined | product
  constructor(private route : ActivatedRoute, private product: ProductService){}
  productMessage : undefined | string;

  ngOnInit(): void {
    let productId= this.route.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    })
  }

  submit(data : product){
    console.log(data);
    if(this.productData){
      data.id = this.productData.id; // earlier we are getting an error because id is not there
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage="Product has been updated."
      }

    });
    setTimeout(()=>{
      this.productMessage = undefined;
    },3000)

  }

}
