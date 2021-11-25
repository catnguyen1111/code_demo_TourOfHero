import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot,Resolve, UrlSegment, UrlTree, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from './model/hero';
import { HeroService } from './Services/hero.service';
import * as HeroAction from './Store/hero.action';
@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  constructor(private hero: HeroService, private store: Store,){}

  resolve(router:ActivatedRouteSnapshot):Observable<any>{
    const id = Number(router.paramMap.get('id'));
    // return this.hero.getHero(id); dùng service ';'
    return this.store.dispatch(new HeroAction.GetHero(id))
  }
}
