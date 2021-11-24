import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TourOfHeroes';

  constructor(private authService: AuthService){}
  ngOnInit(): void {

  }
  logout(){
    localStorage.clear();
    this.authService.logout();
    this.authService.logoutUser();
    console.log("Logout successfully")
  }
}
