import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filterByPrice',
  standalone: true
})
export class FilterByPricePipe implements PipeTransform {

  transform(products:Product[], minPrice:number|null, maxPrice:number | null): any[] {
    
    if (minPrice != null && maxPrice != null)
    {
      return products.filter((item => 
      item.price >= minPrice && item.price <= maxPrice ))
    }
    else 
      return []
    
  }

}
