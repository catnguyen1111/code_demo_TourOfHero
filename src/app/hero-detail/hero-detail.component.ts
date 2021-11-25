import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Hero } from '../model/hero';
import { HeroService } from '../Services/hero.service';
import { Select, Store } from '@ngxs/store';
import { HeroState } from '../Store/hero.state';
import { Observable } from 'rxjs';
import * as HeroAction from '../Store/hero.action';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() dataHero?:Hero;
  @Select(HeroState.selectedHero) dataHero$ !: Observable<Hero>;

  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  getHero(){
    // const id = Number(this.router.snapshot.paramMap.get('id'));
    // // this.heroService.getHero(id).subscribe(hero => this.dataHero = hero);
    // this.store.dispatch(new HeroAction.GetHero(id))
    //sử dụng reslove router
    this.dataHero = this.router.snapshot.data['data'];
    console.log( this.dataHero)
  }
  goBack(){
    this.location.back();
  }
  save(dataHero:Hero){
    // if(this.dataHero){
    //   this.heroService.updateHero(this.dataHero).subscribe(() => this.goBack())
    // }
    this.store.dispatch(new HeroAction.UpdateHero(dataHero)).subscribe(() => this.goBack())
  }
}
