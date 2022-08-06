import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'air-asia-client';
  currentUser: any;
  constructor(private cookieService: CookieService, private router: Router, public authService: AuthService) {
    this.authService.isLoggedIn = cookieService.check('user_token');
    this.authService.currentUserSubject.subscribe((data) => {
      console.log("Subscriber got data >>>>> ",data);
      this.currentUser = data;
    });

    // Check if not at login route
    if(this.authService.isLoggedIn){
      this.authService.setToken(cookieService.get('user_token'))
      this.authService.getUserProfile().subscribe((data: any) => {
        console.log("data", data);
       
      })   
      console.log(this.authService.currentUser)
    }

  }

  logout() {
    console.log("logout")

    this.authService.sendLogoutRequest()
    this.router.navigateByUrl('/login');
    // this.authService.sendLogoutRequest().subscribe((data: any) => {
    //   console.log("data", data);
    //   this.router.navigateByUrl('/login');
    // })   
  }

}