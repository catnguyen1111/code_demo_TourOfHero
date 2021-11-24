import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../Services/hero.service';
import { HeroState } from '../Store/hero.state';
import * as HeroAction from '../Store/hero.action';
import { AuthService } from '../Services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //public heroes: Hero[] = [];
  @Select(HeroState.heroes) heroes$!: Observable<Hero[]>;
  constructor(private heroService: HeroService,private store: Store,public Auth: AuthService) { }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(){
    // this.heroService.getHeroes().subscribe(hero => this.heroes = hero.slice(1,5))
    this.store.dispatch(new HeroAction.GetHeroes());
  }


}
