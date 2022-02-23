import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChoicePageComponent } from './choice-page/choice-page.component';
import { ListComponent } from './list/list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SerchComponent } from './serch/serch.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChoicePageComponent,
    ListComponent,
    NavBarComponent,
    AdminPageComponent,
    UserPageComponent,
    SerchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
