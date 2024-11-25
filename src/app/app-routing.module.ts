import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent) , 
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'cart', loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),title:'Cart'},
    {path:'products', loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:'Products'},
    {path:'productdetails/:id', loadComponent:()=>import('./components/productdetails/productdetails.component').then((m)=>m.ProductdetailsComponent),title:'ProductDetails'},
    {path:'payment/:id', loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:'Payment'},
    {path:'allorders', loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:'All Orders'},
    {path:'about', loadComponent:()=>import('./components/about/about.component').then((m)=>m.AboutComponent),title:'About Us'},
    {path:'contact', loadComponent:()=>import('./components/contact/contact.component').then((m)=>m.ContactComponent),title:'Contact Us'}
  ]},

  {path:'',
  loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent) , 
  children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login', loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
    {path:'register', loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'Register'},
    {path:'forgetpass', loadComponent:()=>import('./components/foregtpassword/foregtpassword.component').then((m)=>m.ForegtpasswordComponent),title:'ForgetPassword'}
  ]},

  {path:'**',
  loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent), title:'NotFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
