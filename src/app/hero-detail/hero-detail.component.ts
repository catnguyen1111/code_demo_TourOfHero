import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event} from '@angular/router';
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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { identifierName } from '@angular/compiler';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() dataHero?:Hero;
  @Select(HeroState.selectedHero) dataHero$ !: Observable<Hero>;
  public check:boolean = true;
  loading:boolean = false;
  check_router:boolean = false;
  data_update :any;
  timeout:any;
  data_test!:Hero
  form!:FormGroup;
  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,
    private spinner: NgxSpinnerService,
    private router1:Router,
    private fb: FormBuilder
  ) {
    this.router1.events.subscribe((event:Event) => {
      switch(true){
        case event instanceof NavigationStart:{
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:{
          this.timeout = setTimeout(() => {
            clearTimeout(this.timeout);
            this.loading = false;
            this.check_router = true;
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
    this.getHero();
    this.dataHero$.subscribe(data =>{this.data_update = data})
    this.form = new FormGroup({
      id: new FormControl(this.data_update.id),
      name : new FormControl(this.data_update.name)
    })

      console.log("form data ",this.form.controls);
     console.log("form data id",this.form.controls.id.value);
     console.log("form data name",this.form.controls.name.value);

  }
  getHero(){
    // const id = Number(this.router.snapshot.paramMap.get('id'));
    // // this.heroService.getHero(id).subscribe(hero => this.dataHero = hero);
    // this.store.dispatch(new HeroAction.GetHero(id))
    //s??? d???ng reslove router

    this.router.snapshot.data['data'];
    this.check = false;
    console.log("Nh???n ???????c d??? li???u")
    this.spinner.hide()
  }
  goBack(){
    this.location.back();
  }
  // onSubmit(){
  //   console.log("submit",this.form)
  // }
  // save(dataHero:Hero){
  //   // if(this.dataHero){
  //   //   this.heroService.updateHero(this.dataHero).subscribe(() => this.goBack())
  //   // }

  //   console.log("dataHero",dataHero);
  //   // this.store.dispatch(new HeroAction.UpdateHero(dataHero)).subscribe(() => this.goBack())
  // }
  save(id:number,name: string){
    this.data_test = {id,name}
    this.store.dispatch(new HeroAction.UpdateHero(this.data_test)).subscribe(() => this.goBack())
  }
}
