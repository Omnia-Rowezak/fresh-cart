import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDetails } from 'src/app/core/interfaces/product-details';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService, private _CartService:CartService,
    private _ToastrService:ToastrService, private _Renderer2:Renderer2){}
  
  productId!:string|null;
  productDetails:any = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe ({
      next:(params)=> {
        this.productId = params.get('id');
        console.log(this.productId);
      }
    });


    this._ProductService.getProductDetails(this.productId).subscribe({
      next:(response) => {
        console.log(response)
        this.productDetails = response.data;
      }
    })

  }
  

  addProduct(id:any, element:any):void {

    this._Renderer2.setAttribute(element, 'disabled', 'true')

    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log(response)
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element, 'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err) => {
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })
  }

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true, 
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    navText: ['', ''],
    items:1,
    nav: true
  }

}
