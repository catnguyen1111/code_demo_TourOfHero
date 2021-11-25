import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot,Resolve, UrlSegment, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroService } from './Services/hero.service';
@Injectable({
  providedIn: 'root'
})
export class ResolveGuard implements Resolve<any> {

  constructor(private hero: HeroService){}

  resolve(router:ActivatedRouteSnapshot){
    const id = Number(router.paramMap.get('id'));
    return this.hero.getHero(id);
  }
}
