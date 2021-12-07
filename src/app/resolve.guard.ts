import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot,Resolve, UrlSegment, UrlTree, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval, Observable, pipe ,of} from 'rxjs';
import { delay, shareReplay, switchMap ,map} from 'rxjs/operators';
import { Hero } from './model/hero';
import { HeroService } from './Services/hero.service';
import * as HeroAction from './Store/hero.action';

@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {
  constructor(private hero: HeroService, private store: Store,private spinner: NgxSpinnerService){}
  check:boolean = false;
  resolve(router:ActivatedRouteSnapshot){
    const id = Number(router.paramMap.get('id'));
    // return this.hero.getHero(id); dùng service ';'
    console.log("Đang call dữ liệu")
    this.check = true
    console.log("check",this.check)
    // this.spinner.show()
    return of(this.store.dispatch(new HeroAction.GetHero(id))).pipe(delay(2000))
  }
}
