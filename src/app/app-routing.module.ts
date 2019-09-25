import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { Page404Component } from './component/page404/page404.component';


const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
