import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ReduxService } from 'src/app/services/redux.service';
import { HomeComponent } from "../home/home.component";
import { EditMovieComponent } from "../edit-movie/edit-movie.component";
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  providers: [EditMovieComponent, DeleteAlertComponent]
})
export class MovieCardComponent implements OnInit {

  @Input()
  public imageSource: string;

  @Input()
  public titleSource: string;

  @Input()
  public dateSource: string;

  @Input()
  public movieID: string;

  public details: boolean = false;
  constructor(private redux: NgRedux<Store>, private reduxService: ReduxService, private homeComponent: HomeComponent, private EditMovieComponent: EditMovieComponent, private deleteAlert: DeleteAlertComponent) { }

  ngOnInit() {
  }

  public activeEditModal(id) {
    this.details = true;
    this.homeComponent.getMovieDetails(id);
  }

  public editMovie(movieID) {
    sessionStorage.setItem("edit", movieID);
    this.homeComponent.movieForEditDetails(movieID);
  }

  public deleteMovie(movieID) {
    sessionStorage.setItem("movieDeleteID", movieID);
    this.redux.getState().activeDeleteModal = true;
  }
}
