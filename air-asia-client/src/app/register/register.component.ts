import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  constructor(private cookieService: CookieService, private _formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    // cookieService.set('laravel_session', 'value')
    // console.log('laravel_session', cookieService.getAll())

  }
  ngOnInit(): void {
    this.registerFormGroup = this._formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required]
    });    
  }
  clickedSignUp(): void {
    console.log("clickedSignUp!");
    console.log(this.registerFormGroup.value);
    this.registerFormGroup.value.username = this.registerFormGroup.value.email
    this.authService.sendRegisterRequest(this.registerFormGroup.value).subscribe((data: any) => {
      console.log("data", data);
      this.router.navigateByUrl('/card-list');
    })   
  }
  
  clickedLogin(): void {
    console.log("clickedLogin!");
    this.router.navigateByUrl('/login');
  }

}
