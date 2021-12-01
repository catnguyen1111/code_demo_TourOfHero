import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './Services/auth.service';
import { LoadingService } from './Services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TourOfHeroes';
  loading$ = this.loader.loading$;
  constructor(
    private authService: AuthService,public loader:LoadingService){ }

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.authService.logoutUser();
    console.log("Logout successfully")
  }

}
