import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productResult: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData : product | undefined;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    private router:Router

  ) {}

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        console.log(result);
        this.productResult = result;

        let cartData = localStorage.getItem('localCart');
        if (productId && cartData) {
          let items = JSON.parse(cartData);
          items = items.filter(
            (item: product) => productId == item.id.toString()
          );
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }

        let user = localStorage.getItem('user');
        if(user){

          let userId = user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result)=>{
            let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
            if(item.length){
              this.cartData=item[0];
              this.removeCart = true;
            }
          })

        }
        
      });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'max') {
      this.productQuantity += 1;
      //this.productQuantity = this.productQuantity + 1
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if (this.productResult) {
      this.productResult.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productResult);
        this.removeCart = true;
      } else {
        //console.log('user is logged in')
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        //console.log(userId)
        let cartData: cart = {
          ...this.productResult,
          userId,
          productId: this.productResult.id,
        };
        delete cartData.id;
        //console.log(cartData);
        this.product.AddToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart =true;
          }
        });
      }
    }
  }
  removeToCart(productId: number) {
    if(!localStorage.getItem('user')){

      this.product.removeItemFromCart(productId);
      //this.removeCart = false;

    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.log(this.cartData);
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.product.getCartList(userId);
        }
      })
      this.removeCart=false;

    }
    
  }
  buynow(){
    this.router.navigate(['cart-page'])
  }
}
