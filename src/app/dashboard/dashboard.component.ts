import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../Services/hero.service';
import { HeroState } from '../Store/hero.state';
import * as HeroAction from '../Store/hero.action';
import { AuthService } from '../Services/auth.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //public heroes: Hero[] = [];
  loading:boolean = false;
  timeout:any;
  check:boolean = false;
  @Select(HeroState.heroes) heroes$!: Observable<Hero[]>;
  constructor(private heroService: HeroService,private store: Store,public Auth: AuthService,private router: Router) {
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
            this.check = true;
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
    this.getHeroes();
  }
  getHeroes(){
    // this.heroService.getHeroes().subscribe(hero => this.heroes = hero.slice(1,5))
    this.store.dispatch(new HeroAction.GetHeroes());
  }


}
