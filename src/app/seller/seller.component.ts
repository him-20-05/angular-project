import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent {
  constructor(private seller: SellerService, private router: Router) {}
  showlogin = false;
  authError = '';
  signUpError = '';
  

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp): void {
    console.warn(data);
    this.signUpError = 'Please fill in all required fields.';

    // Check if the required fields are empty
    if (!data.name || !data.mobile || !data.email || !data.password) {
      console.log('Please fill in all required fields.');
      setTimeout(() => {
        this.signUpError = '';
      }, 3000);
      
      // You can display an error message or perform other actions here
      return; // Exit the function if the form is incomplete
    }

    // If all required fields are filled, proceed with signup
    this.seller.userSignUp(data);
  }

  LogIn(data: SignUp): void {
    console.log(data);
    this.authError = 'Email or password is not correct';
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        setTimeout(()=>{

          this.authError = '';

        }, 3000);
        

      }

    }) // subscribe is used to handle async data properly
  }

  openLogin() {
    this.showlogin = true;
  }

  openSignUp() {
    this.showlogin = false;
  }
}
