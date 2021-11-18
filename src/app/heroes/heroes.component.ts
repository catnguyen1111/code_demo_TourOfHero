import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import {HeroState} from '../Store/hero.state'
import * as HeroAction from '../Store/hero.action'
import {Hero} from '../model/hero'
import {HEROES} from '../mock-heroes/mock-heroes'
import { HeroService } from '../Services/hero.service';
import { MessageService } from '../Services/message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @Select(HeroState.heroes) heroes$ !: Observable<Hero[]>;
  public selectedHero ?:Hero;
  public heroes:Hero[] = [];
  constructor(private heroService: HeroService,
    private messageService: MessageService,
    private store:Store

    ) { }

  ngOnInit(): void {
    this.getHeroes();
    console.log("heroes$",this.heroes$);
  }
  getHeroes(){
    //this.heroes = this.heroService.getHeroes();
  //  this.heroService.getHeroes().subscribe(hero=>
  //   this.heroes = hero,
  //   );
  //   console.log(this.heroes)
    this.store.dispatch(new HeroAction.GetHeroes())
  }
  // onSelect(hero:Hero){
  //   this.selectedHero = hero;
  //   console.log(this.selectedHero);
  //   this.messageService.add(`selectedHero: ${this.selectedHero.id} ${this.selectedHero.name}`)
  // }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    // this.heroService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
    this.store.dispatch(new HeroAction.AddHero({name} as Hero))
  }
  delete(hero: Hero): void {
    this.heroes  = this.heroes.filter(h => h!== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
    this.store.dispatch(new HeroAction.DeleteHero(hero.id))
  }

}
