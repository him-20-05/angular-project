import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  menuType: String = 'default';
  sellerName: string = '';
  userName: string = '';
  constructor(private route: Router, private product : ProductService) {}
  icon = faCartShopping;
  cartItemCount = 0;
  searchResult : undefined | product[];
  

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        //console.log('Current URL:', val.url); // Add this line for debugging
  
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          //console.log('In seller area');
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.product.getCartList(userData.id)
        }
         else {
          //console.log('Outside seller area');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItemCount = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItemCount = items.length;
      console.log('Cart items:', items);
    })
  }
  logOut(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query : KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result)=>{

        console.log("result", result);
        this.searchResult = result;
        if(result.length>5){
          result.length=5;
        }

      })
    }

  }
  hideSearch(){

    this.searchResult = undefined;

  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`, { timestamp: new Date().getTime() }])
    //console.log("val", val);
  }
  // navigateToSearchResult(query: string) {
  //   this.route.navigate([`search/${query}`]);
  //   this.searchResult = undefined; // Clear suggestions after navigation
  // }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
}  
