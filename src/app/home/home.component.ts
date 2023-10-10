import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

 popularProducts : undefined | product[];
 trendyProducts : undefined | product[];

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.product.popularProducts().subscribe(
      (data) => {
        console.log(data);
        this.popularProducts = data;
      },
      (error) => {
        console.error('Error fetching popular products:', error);
      }
    );
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }
}  
