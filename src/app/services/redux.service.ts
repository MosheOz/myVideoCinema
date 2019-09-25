import { Injectable } from '@angular/core';
import { MoviesService } from './movies.service';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';
import { ActionType } from '../redux/action-type';

@Injectable({
  providedIn: 'root'
})
export class ReduxService {

  public constructor(private moviesService: MoviesService, private redux: NgRedux<Store>) {

  }

  // call getAllMovies service and update store wuth redux dispatcher
  public updateRedux() {
    this.moviesService.getAllMovies()
      .subscribe((movies) => {
        const action = {
          type: ActionType.GetAllMovies,
          payload: movies['results']
        }

        this.redux.dispatch(action);
      })
  }

  public activeEditModal() {
    const action = {
      type: ActionType.ActiveEditModal,
      payload: true
    }
    this.redux.dispatch(action);
  }

  public updateMovieInStore(movieObj) {
    const action = {
      type: ActionType.UpdateMovie,
      payload: movieObj
    }
    this.redux.dispatch(action);
  }

  public movieForEdit(obj) {
    const action = {
      type: ActionType.MovieForEdit,
      payload: obj
    }
    this.redux.dispatch(action);
  }

  public deleteMovie(id) {
    const action = {
      type: ActionType.DeleteMovie,
      payload: id
    }
    this.redux.dispatch(action);
  }

  public addMovie(newMovie) {
    const action = {
      type: ActionType.AddMovie,
      payload: newMovie
    }
    this.redux.dispatch(action);
  }

  public activeAddMovieModal() {
    const action = {
      type: ActionType.ActiveMovieAddModal
    }
    this.redux.dispatch(action);
  }
}



