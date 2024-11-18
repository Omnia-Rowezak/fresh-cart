import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit{

  constructor(private _CartService:CartService){}
  ordersDetails:any = {}
  cartDetails:any = null;

  ngOnInit(): void {
    this._CartService.getAllOrders().subscribe({
      next:(response)=> {
        console.log('allorders',response.data)
        this.ordersDetails = response.data;
      }
    })

  }
  
  clearCart():void{
    this._CartService.clearCart().subscribe({
      next:(response) => {
        if(response.message === "success"){
          this.cartDetails = null;
          this._CartService.cartNumber.next(0)
        }
      }
    })
  }




}
