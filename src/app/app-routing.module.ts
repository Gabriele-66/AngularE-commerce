import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ChoicePageComponent } from './choice-page/choice-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserPageComponent } from './user-page/user-page.component';


const routes: Routes = [
  { path: "", redirectTo:"/Login", pathMatch:"full"},
  { path: 'Login', component: LoginComponent },
  { path: 'Disambiguation', component: ChoicePageComponent },
  { path: 'Admin', component: AdminPageComponent },
  { path: 'User', component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
