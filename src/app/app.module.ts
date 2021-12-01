import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { LoginComponent } from './login/login.component';
import { ResolveGuard } from './resolve.guard';

import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import { NetworkInterceptor } from './network.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    PopupComponent,
    LoginComponent
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
    BrowserAnimationsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgxSpinnerModule
  ],
  providers: [AuthService,ResolveGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass : NetworkInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent],
})
export class AppModule { }

