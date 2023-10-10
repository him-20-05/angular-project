import { Component } from '@angular/core';
import { LogIn, SignUp, cart, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent {
  showlogin = false;
  constructor(private user: UserService, private product : ProductService) {}
  authError: string = '';

  ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignup(data);
  }

  LogIn(data: LogIn) {
    this.authError = 'Please enter valid user details';
    this.user.userLogin(data);
    this.user.inValidUser.subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.authError = '';
        }, 3000);
      } else {
        this.localCartToRemoteCart();
      }
    });
  }

  openLogin() {
    this.showlogin = true;
  }

  openSignUp() {
    this.showlogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId,
        };
      
        delete cartData.id;
        setTimeout(() => {
          this.product.AddToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Item stored in DB");
            }
          });
      
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
      
}
  setTimeout(() => {
    this.product.getCartList(userId)
    
  }, 2000);
  }
}
