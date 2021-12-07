import { Component, OnInit } from '@angular/core';
import { Router,Event,NavigationEnd,NavigationStart,NavigationCancel,NavigationError } from '@angular/router';
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
  loading: boolean = false;
  check :boolean = false;
  timeout: any;
  constructor(
    private authService: AuthService,
    public loader:LoadingService,
    private router: Router
    ){
      this.router.events.subscribe((event:Event) => {
        switch(true){
          case event instanceof NavigationStart:{

            this.loading = true;
            break;
          }
          case event instanceof NavigationEnd:{
            this.timeout = setTimeout(() => {
              clearTimeout(this.timeout);
              this.loading = false;

           }, 1000);
            break;
          }
          case event instanceof NavigationCancel:
          case event instanceof NavigationError:{
            this.loading = false;
            break;
          }
          default:{
            break;
          }

        }
      })
    }

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    this.authService.logout();
    this.authService.logoutUser();
    console.log("Logout successfully")
  }

}
