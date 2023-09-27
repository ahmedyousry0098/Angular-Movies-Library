import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesDataResponse: IMovie[] = [];
  constructor(private moviesService: MoviesService) {}
  ngOnInit() {
    this.moviesService.fetchProductsPage().subscribe((data) => {
      console.log(data.results);
      this.moviesDataResponse = data.results;
    });
  }
}
