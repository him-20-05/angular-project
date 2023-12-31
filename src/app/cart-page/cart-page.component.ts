import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary : priceSummary={
    price :0,
    discount:0,
    tax:0,
    deliveryCharge:0,
    total:0
  }
  constructor(private product:ProductService, private router:Router){}

  ngOnInit():void{
   this.loadDetails();
  }

  loadDetails(){
    this.product.currentCart().subscribe((result)=>{
      this.cartData = result;
      //console.log(result);
      let price = 0;
      result.forEach((item)=>{
        if(item.quantity){

          price = price + (+item.price* + item.quantity);

        }
        
      });
      console.log(price);
      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/5;
      this.priceSummary.deliveryCharge = 100;
      this.priceSummary.total = price+(price/5)+100-(price/10);
      //console.log(this.priceSummary);
      if(!this.cartData.length){

        this.router.navigate(['/'])

      }

    })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  removeToCart(cartId:number | undefined){

      cartId && this.cartData && this.product.removeToCart(cartId).subscribe((result)=>{
        
         this.loadDetails();
        
      })

  }

}
