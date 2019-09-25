import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ReduxService } from 'src/app/services/redux.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {

  isAlert: boolean = false;
  public movieID: any;
  constructor(public redux: NgRedux<Store>, public reduxService: ReduxService) { }

  ngOnInit() {
  }

  public delete() {
    this.movieID = sessionStorage.getItem("movieDeleteID");
    this.reduxService.deleteMovie(this.movieID);
    this.redux.getState().activeDeleteModal = false;
  }

}
