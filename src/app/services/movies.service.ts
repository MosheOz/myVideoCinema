import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public constructor(private httpClient: HttpClient) {

  }

  public getAllMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>("https://api.themoviedb.org/3/movie/popular?api_key=c585f8b3bc284bccd50e9ac0c38d4a15&page=1");
  }

  public getMovieDetailsByID(movieID: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`https://api.themoviedb.org/3/movie/${movieID}?api_key=c585f8b3bc284bccd50e9ac0c38d4a15`);
  }

  public getMovieGenreByID(movieID: string): Observable<any> {
    return this.httpClient.get<Movie>(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=c585f8b3bc284bccd50e9ac0c38d4a15`);
  }
}
