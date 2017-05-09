import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { TokenModule } from './token/token.module';
import { Angular2SocialLoginModule } from "angular2-social-login";
let providers = {
    "facebook": {
      "clientId": "268585663526955",
      "apiVersion": "v2.7" //like v2.4
    }
  };



@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, AboutModule, HomeModule, TokenModule,SharedModule.forRoot(), Angular2SocialLoginModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);