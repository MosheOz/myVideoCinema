import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input()
  id: any;

  @Input()
  title: any;

  @Input()
  release_date: any;

  @Input()
  runtime: any;

  @Input()
  director: any;

  @Input()
  genres: any;

  @Input()
  overview: any;

  public isYear: boolean = false;
  public movieForReplace: Movie

  constructor(private homeComponent: HomeComponent) { }


  ngOnInit() {
  }

  public send(id, title, year, runtime, overview, director, genre) {
    if (year.split('-')[0] < "1900") {
      return this.isYear = true;
    };
    this.homeComponent.editObjInStore(id, title, year, runtime, overview, director, genre);
  }

  public closeModal() {
    this.homeComponent.showEditModal = false;
  }
}
