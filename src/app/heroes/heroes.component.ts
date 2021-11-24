import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, INJECTOR, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import {HeroState} from '../Store/hero.state'
import * as HeroAction from '../Store/hero.action'
import {Hero} from '../model/hero'
import {HEROES} from '../mock-heroes/mock-heroes'
import { HeroService } from '../Services/hero.service';
import { MessageService } from '../Services/message.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';
import {PopupComponent} from '../popup/popup.component';
import { AlertService } from '../Services/alert.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit,AfterViewInit,OnDestroy {
  @Select(HeroState.heroes) heroes$ !: Observable<Hero[]>;
  public selectedHero ?:Hero;
  public heroes:Hero[] = [];
  public check:boolean = false;
  public dulieu:any = false;
  @ViewChild('dynamicComponent',{
    read: ViewContainerRef,
    static: true
  })containerRef!: ViewContainerRef;

  componentRef!:ComponentRef<PopupComponent>

  constructor(private heroService: HeroService,
    private messageService: MessageService,
    private store:Store,
    private auth: AuthService,
    private cfr: ComponentFactoryResolver,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.getHeroes();
    console.log("heroes$",this.heroes$);
    this.alertService.close$.subscribe(
      () => {
        this.containerRef.clear()
        if(this.componentRef){
          this.componentRef.destroy();
        }
      }
    )
  }
  ngAfterViewInit(){
    this.addDynamicComponenetOne();
  }
  ngOnDestroy(){
    if(this.componentRef){
      this.componentRef.destroy();
    }
  }
  getHeroes(){
    this.store.dispatch(new HeroAction.GetHeroes())

  }
  add(name: string): void {
    name = name.trim();
    console.log('name',name);
    if (!name) {
      return;
    }
    this.auth.login();
    this.store.dispatch(new HeroAction.AddHero({name} as Hero))
  }
  delete(hero: Hero): void {
    this.heroes  = this.heroes.filter(h => h!== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
    this.store.dispatch(new HeroAction.DeleteHero(hero.id))

  }

  addDynamicComponenetOne(){
    const container =  this.containerRef;
    container.clear();
    const injector = container.injector;

    const componentFactory =  this.cfr.resolveComponentFactory(PopupComponent);
    const componentRef = this.containerRef.createComponent(componentFactory,0,injector);
    componentRef.instance.data = this.dulieu;

  }
  blur(){
    this.dulieu = true;
    this.addDynamicComponenetOne()
  }
}
