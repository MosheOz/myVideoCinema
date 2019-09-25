import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { MoviesService } from 'src/app/services/movies.service';
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public movies: Movie[];
  public movie: Movie;
  public movieForReplace: Movie;
  public movieForEdit = new Movie();
  public showEditModal: boolean = false;

  public constructor(public redux: NgRedux<Store>, public moviesService: MoviesService, public reduxService: ReduxService) { }

  ngOnInit() {
    this.redux.subscribe(() => {
      this.movies = this.redux.getState().movies;
    });
  }

  public getMovieDetails(movieID) {

    this.redux.getState().isLoading = true;

    // check if item already exist in store
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id == movieID && this.movies[i].isExist == true) {
        this.redux.getState().isLoading = false;
        this.movie = this.movies[i];
        return;
      }
    }

    // do if not exist in store
    this.moviesService.getMovieDetailsByID(movieID)
      .subscribe((movieResponse) => {
        this.movieForReplace = movieResponse;
        this.moviesService.getMovieGenreByID(movieID)
          .subscribe((genreResponse) => {
            this.movieForReplace.director = genreResponse.crew[0].name;
            this.isMovieInEditMoviesArr(movieID, this.movieForReplace);
          }, err => console.log("Error: ", err))
      }, err => console.log("Error: ", err))
  }


  public isMovieInEditMoviesArr(id: number, obj: Movie) {
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id == id) {
        this.movies.splice(i, 1, obj);
        this.redux.getState().isLoading = false;
        this.movies[i].isExist = true;
        this.movie = this.movies[i];
      }
    }
  }

  public forEdit(id: number, obj: Movie) {
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id == id) {
        this.movies.splice(i, 1, obj);
        this.redux.getState().isLoading = false;
        this.movies[i].isExist = true;
        this.showEditModal = true;
      }
    }
  }

  public movieForEditDetails(movieID) {
    this.redux.getState().isLoading = true;
    for (let i = 0; i < this.movies.length; i++) {

      if (this.movies[i].id == movieID) {
        if (this.movies[i].isExist == true) {
          this.redux.getState().isLoading = false;
          this.movieForEdit = this.movies[i];
          this.showEditModal = true;
        }
        else {

          this.moviesService.getMovieDetailsByID(movieID)
            .subscribe((movieResponse) => {
              this.movieForEdit = movieResponse;
              this.moviesService.getMovieGenreByID(movieID)
                .subscribe((genreResponse) => {
                  this.movieForEdit.director = genreResponse.crew[0].name;
                  this.forEdit(movieID, this.movieForEdit);

                }, err => console.log("Error: ", err))
            }, err => console.log("Error: ", err))
        }
      }
    }
  }

  public editObjInStore(id, title, year, runtime, overview, director, genre) {

    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].id == id) {
        this.movies[i].title = title;
        this.movies[i].release_date = year;
        this.movies[i].runtime = runtime;
        this.movies[i].overview = overview;
        this.movies[i].director = director;
        this.movies[i].genres = [{ id: Math.floor(Math.random() * 100000000), name: genre }];;
        this.movies[i].isExist = true;
        this.showEditModal = false;
      }
    }
  }
  public closeModal() {
    this.movie = null;
  }

  public activeAddMovieModal() {
    this.reduxService.activeAddMovieModal();
  }
}
