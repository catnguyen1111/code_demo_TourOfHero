import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxsModule } from '@ngxs/store';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InMemoryDataService } from './Services/in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component'
import { HeroState } from './Store/hero.state';
import { AuthService } from './Services/auth.service';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }),
    NgxsModule.forRoot([HeroState]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule { }
