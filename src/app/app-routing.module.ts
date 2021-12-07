import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth-admin.guard';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { LoginComponent } from './login/login.component';
import { PopupComponent } from './popup/popup.component';
import { AuthService } from './Services/auth.service';
import {MessagesComponent} from './messages/messages.component';
import { ResolveGuard } from './resolve.guard';
const routes: Routes = [
  {path:'',redirectTo : '',pathMatch : 'full'},
  {path:'login',component:LoginComponent,canDeactivate:[AuthGuard]},
  {path:'heroes',component:HeroesComponent,canActivate :[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate :[AuthGuard]},
  {path:'detail/:id',component:HeroDetailComponent,canActivate :[AuthAdminGuard],
    resolve:{
      data:ResolveGuard,
    }

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
