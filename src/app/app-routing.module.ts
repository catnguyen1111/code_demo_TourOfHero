import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { PopupComponent } from './popup/popup.component';
import { AuthService } from './Services/auth.service';

const routes: Routes = [
  {path:'',redirectTo : '/dashboard',pathMatch : 'full'},
  // {path:'heroes',component:HeroesComponent,canDeactivate:[AuthGuard]},
  {path:'heroes',component:HeroesComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'detail/:id',component:HeroDetailComponent},
  {path:'pop',component:PopupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
