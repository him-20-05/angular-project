import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerService } from './services/seller.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sellerService: SellerService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem('seller')) {
      return new Observable<boolean | UrlTree>(observer => {
        observer.next(true); // Emit true as an observable value
        observer.complete(); // Complete the observable
      });
    }
    
    return this.sellerService.isSellerLoggedIn;
  }
}
