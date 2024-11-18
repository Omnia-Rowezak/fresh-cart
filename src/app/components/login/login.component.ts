import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder){}

  errMsg:string = '';
  isLoading:boolean = false;

  loginForm:FormGroup = this._FormBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
  });


  handleForm():void{
    const userData = this.loginForm.value;
    this.isLoading = true;

    if(this.loginForm.valid === true){
      this._AuthService.login(userData).subscribe({
        next:(respose)=> {
          console.log('response',respose)
          if(respose !== null){
            localStorage.setItem('etoken', respose.token)
            this._AuthService.decodeUser;
            this._Router.navigate(['/home'])
            this.isLoading = false;
          }
        },
        error:(err)=> {
          console.log('errorrr',err)
          this.errMsg = err.error.message ;
          this.isLoading = false;
        }
      })

    }

  }

 // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl('', [Validators.required, Validators.email]),
  //   password:new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  // });
}
