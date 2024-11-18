import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{

  constructor(private _Router:Router, private _CartService:CartService, private _Renderer2:Renderer2){}
  cartNum:number = 0;

  @ViewChild('navBar') navElement!:ElementRef;
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 500){
      this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
    }
    else {
      this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
      this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')
    }
  }

  ngOnInit(): void {

    this._CartService.cartNumber.subscribe({
      next:(data)=> {
        this.cartNum = data;
      }
    })

    this._CartService.getUserCart().subscribe({
      next:(respone)=> {
        console.log(respone)
        this.cartNum = respone.numOfCartItems
      }
    })
  }
  
  signOut():void {
    localStorage.removeItem('etoken')
    this._Router.navigate(['/login'])

  }

}
