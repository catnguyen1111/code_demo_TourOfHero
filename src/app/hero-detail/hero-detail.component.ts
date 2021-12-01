import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Hero } from '../model/hero';
import { HeroService } from '../Services/hero.service';
import { Select, Store } from '@ngxs/store';
import { HeroState } from '../Store/hero.state';
import { Observable } from 'rxjs';
import * as HeroAction from '../Store/hero.action';
import { LoadingService } from '../Services/loading.service';
import { delay, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() dataHero?:Hero;
  @Select(HeroState.selectedHero) dataHero$ !: Observable<Hero>;
  public check:boolean = true;
  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getHero();

  }
  getHero(){
    // const id = Number(this.router.snapshot.paramMap.get('id'));
    // // this.heroService.getHero(id).subscribe(hero => this.dataHero = hero);
    // this.store.dispatch(new HeroAction.GetHero(id))
    //sử dụng reslove router

    this.router.snapshot.data['data'];
    this.check = false;
    console.log("Nhận được dữ liệu")
    this.spinner.hide()


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
