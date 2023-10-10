import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogIn, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  isSignupError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  userSignUp(data: SignUp) {
    console.log('service call');
    this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        this.isSignupError.emit(true);
        console.log('result', result);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: LogIn) {
    console.log(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        console.log(result);

        // Check if the result body is an array
        if (Array.isArray(result.body)) {
          if (result.body.length > 0) {
            console.log('user logged-in');
            localStorage.setItem('seller', JSON.stringify(result.body));
            this.router.navigate(['seller-home']);
          } else {
            // User not found, handle the case where there are no matching records
            console.log('log-in failed');
            this.isLoginError.emit(true);
          }
        }
      });
  }
}
