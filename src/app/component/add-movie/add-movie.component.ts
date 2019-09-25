import { Component, OnInit } from '@angular/core';
import { ReduxService } from 'src/app/services/redux.service';
import { Movie } from 'src/app/models/movie';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public newMovie = new Movie();
  public movie = new Movie();
  public isYear: boolean = false;
  public isTitle: boolean = false;
  public today = new Date().toJSON().split('T')[0];
  public idForMovie = Math.floor(Math.random() * 1000000);
  public moviesState: Movie[];
  constructor(private reduxService: ReduxService, public redux: NgRedux<Store>) { }

  ngOnInit() {
    this.redux.subscribe(() => {
      this.moviesState = this.redux.getState().movies;
    })
  }

  public send() {
    if (this.checkIsTitle(this.newMovie.title)) {
      return this.isTitle = true;
    }
    if (this.newMovie.release_date.split('-')[0] < "1900" || this.newMovie.release_date > this.today) {
      return this.isYear = true;
    };
    if (this.checkIsID(this.idForMovie)) {
      this.newMovie.id = this.idForMovie;
    }
    const link = this.newMovie.backdrop_path;
    const genre = this.newMovie.genres;
    this.newMovie.poster_path = link;
    this.newMovie.isExist = true;
    this.newMovie.genres = [{ id: Math.floor(Math.random() * 100000000), name: genre }];

    const movieVar = this.newMovie;
    this.movie = this.newMovie;
    this.redux.getState().activeMovieAddModal = false;
    this.reduxService.addMovie(this.movie);
    this.newMovie = new Movie;
  }

  // validate date year
  public isValidDate() {
    return this.newMovie.release_date.split('-')[0] < "1900"
  }

  // check if this ID available
  public checkIsID(id) {
    for (let i = 0; i < this.moviesState.length; i++) {
      if (this.moviesState[i].id == id) {
        this.idForMovie = Math.floor(Math.random() * 1000000);
        this.checkIsID(this.idForMovie);
      }
    }
    return true;
  }

  // check if this ID available
  public checkIsTitle(title) {
    for (let i = 0; i < this.moviesState.length; i++) {
      if (this.moviesState[i]["title"] == title) {
        return true;
      }
    }
    return false;
  }
}


