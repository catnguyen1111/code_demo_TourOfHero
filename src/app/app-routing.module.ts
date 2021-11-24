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

const routes: Routes = [
  {path:'',redirectTo : '/login',pathMatch : 'full'},
  {path:'login',component:LoginComponent,canDeactivate:[AuthGuard]},
  // {path:'heroes',component:HeroesComponent,canDeactivate:[AuthGuard]},
  {path:'heroes',component:HeroesComponent,canActivate :[AuthGuard],canDeactivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate :[AuthGuard],canDeactivate:[AuthGuard]},
  {path:'detail/:id',component:HeroDetailComponent,canActivate :[AuthAdminGuard],canDeactivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
