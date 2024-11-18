import { Product } from './../../core/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FilterByPricePipe } from 'src/app/core/pipe/filter-by-price.pipe';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, SearchPipe, FormsModule, FilterByPricePipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private _ProductService:ProductService, private _CartService:CartService, 
  private _ToastrService:ToastrService, private _Renderer2:Renderer2){}

  products:Product[] = [];
  term:string = ''
  minPrice:number | null = null
  maxPrice: number | null = null

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response) =>{
        console.log(response.data)
        this.products = response.data;
      }
    })
  }



  addProduct(id:any, element:any):void {

    this._Renderer2.setAttribute(element, 'disabled', 'true')

    this._CartService.addToCart(id).subscribe({
      next:(response) => {
        console.log('basket',response)
        console.log(response.message)
        this._ToastrService.success(response.message)
        this._Renderer2.removeAttribute(element, 'disabled')
        this._CartService.cartNumber.next(response.numOfCartItems) 
      },
      error:(err) => {
        this._Renderer2.removeAttribute(element, 'disabled')
      }
    })

  }


  // addProduct(id:any):void {
  //   this._CartService.addToCart(id).subscribe({
  //     next:(response) => {
  //       console.log('basket',response)
  //       //console.log(response.message)
  //       //this._ToastrService.success(response.message)
  //       //this._Renderer2.removeAttribute(element, 'disabled')
  //       //this._CartService.cartNumber.next(response.numOfCartItems) 
  //     },
  //     // error:(err) => {
  //     //   this._Renderer2.removeAttribute(element, 'disabled')
  //     // }
  //   })

  // console.log('ID',id)
 
  // }



}
