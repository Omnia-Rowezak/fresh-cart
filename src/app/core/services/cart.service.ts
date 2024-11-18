import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/';
  
  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  prodId:string = '' ;
  prodDetails!:any[] 

  // addToCart(prodId:string):Observable<any>{
  //   return this._HttpClient.post(this.baseUrl + `Basket`, 
  //   {
  //   id:prodId,
  //   items:[]
  //   }
  //   )
  // }

  

  // getUserCart():Observable<any>{
  //   return this._HttpClient.get( this.baseUrl + `Basket`)
  // }


  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `cart`, 
    {productId:prodId})
  }


  getUserCart():Observable<any>{
    return this._HttpClient.get( this.baseUrl + `cart`)
  }

  

  removeCartItem(prodId:string):Observable<any>{
    return this._HttpClient.delete( this.baseUrl + `cart/${prodId}`)
  }

  updateCartCount(prodId:string, countNum:number):Observable<any>{
    return this._HttpClient.put( this.baseUrl + `cart/${prodId}`,
      {
        count: countNum
      })
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete( this.baseUrl + `cart`)
  }

  checkOut(cartId:string|null, cartInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 
      `orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:cartInfo
    })
  }

  getAllOrders():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `orders/`)
  }
}
