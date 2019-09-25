import { Component, OnInit, Input } from '@angular/core';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input()
  public imageSource: string;

  @Input()
  public id: any;

  @Input()
  public mainTitle: string;

  @Input()
  public year: number;

  @Input()
  public overviewContent: string;

  @Input()
  public director: string;

  @Input()
  public runtime: string;

  @Input()
  public genre: string;

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit() {
  }

  public close() {
    this.homeComponent.closeModal();
  }
}
