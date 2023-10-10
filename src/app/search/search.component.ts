import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResult : undefined | product[];
  noResultsFound: boolean = false; 
  constructor(private activeRoute : ActivatedRoute, private product:ProductService){}

  ngOnInit():void{
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      let query = this.activeRoute.snapshot.paramMap.get('query');
      console.log('query', query);
      query &&
        this.product.searchProducts(query).subscribe((result) => {
          this.searchResult = result;
        });
    });
  }
}
