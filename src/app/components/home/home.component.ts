import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { Category } from 'src/app/core/interfaces/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarouselModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private _ProductService:ProductService){}

  products:Product[] = [];
  categories: Category[] = []; 

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response)=> {
        console.log('Products', response.data);
        this.products = response.data;
      }
    })

    this._ProductService.getCategories().subscribe({
      next:(response)=> {
        console.log('Categories', response.data)
        this.categories = response.data;
      }
    })

  }





  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true, 
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: false
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0:{items:1},
      400:{items:2},
      740:{items:3},
      940:{items:4}
    },
    items:4,
    nav: false
  }

}
