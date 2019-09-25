import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './component/layout/layout.component';
import { NavComponent } from './component/nav/nav.component';
import { Page404Component } from './component/page404/page404.component';
import { HomeComponent } from './component/home/home.component';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { Store } from './redux/store';
import { Reducer } from './redux/reducer';
import { HttpClientModule } from "@angular/common/http";
import { ReduxService } from './services/redux.service';
import { MovieCardComponent } from './component/movie-card/movie-card.component';
import { EditMovieComponent } from './component/edit-movie/edit-movie.component';
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';
import { MinuteSecondPipe } from './pipes/minute-second.pipe';
import { FormsModule } from '@angular/forms';
import { DeleteAlertComponent } from './component/delete-alert/delete-alert.component';
import { MovieLinkPipe } from './pipes/movie-link.pipe';
import { AddMovieComponent } from './component/add-movie/add-movie.component';
import { RemoveSpecialCharactersPipe } from './pipes/remove-special-characters.pipe';

@NgModule({
  declarations: [LayoutComponent, NavComponent, Page404Component, HomeComponent, MovieCardComponent, EditMovieComponent, MovieDetailsComponent, MinuteSecondPipe, DeleteAlertComponent, MovieLinkPipe, AddMovieComponent, RemoveSpecialCharactersPipe],
  imports: [BrowserModule, AppRoutingModule, NgReduxModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {

  public constructor(redux: NgRedux<Store>, reduxService: ReduxService) {
    redux.configureStore(Reducer.reduce, new Store());
    reduxService.updateRedux();
  }
}
