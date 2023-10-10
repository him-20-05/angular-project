import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productMessage:undefined | string
  productList:undefined | product[]
  icon = faTrash;
  icons = faEdit;

  constructor(private product:ProductService){}

  ngOnInit(): void{
    this.list();
   
  }
  list(){

    this.product.productList().subscribe((result)=>{
      this.productList=result;
      console.log(result);

    })

  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is deleted";
        // Remove the deleted product from the productList array
       // this.productList = this.productList?.filter((product) => product.id !== id); // we can also use above method to refresh the page 
       
       this.list(); // list part is firstly written in ngOnit method but we separately write the list part and use that list part in ngOnit and in delete . If we use list part in delete it will automatically refresh the page.
      }
    });
  
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
    console.log("id", id);
  }
}  
