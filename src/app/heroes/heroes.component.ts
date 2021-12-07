import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, INJECTOR, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of, timer } from 'rxjs';

import {HeroState} from '../Store/hero.state'
import * as HeroAction from '../Store/hero.action'
import {Hero} from '../model/hero'
import {HEROES} from '../mock-heroes/mock-heroes'
import { HeroService } from '../Services/hero.service';
import { MessageService } from '../Services/message.service';
import { Event,NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { FormControl } from '@angular/forms';
import {PopupComponent} from '../popup/popup.component';
import { AlertService } from '../Services/alert.service';
import { LoadingService } from '../Services/loading.service';
import { delay, timeout } from 'rxjs/operators';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit,AfterViewInit,OnDestroy {
  @Select(HeroState.heroes) heroes$ !: Observable<Hero[]>;
  public selectedHero ?:Hero;
  public heroes:Hero[] = [];
  check:boolean = false;
  check_router:boolean = false;
  timeout:any;
  loading:boolean = false;
  public dulieu:string = '';
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
    private alertService: AlertService,
    private loader: LoadingService,
    private router: Router
    ) {
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
    componentRef.instance.data = this.check;


  }
  blur() {

    this.check = true;
    this.addDynamicComponenetOne()
  }
}
