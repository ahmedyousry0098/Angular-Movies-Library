import { Component, SimpleChange } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesDataResponse: IMovie[] = [];
  ngbPage: number = 1
  pageSize: number = 20
  collectionSize: number = 10000 // assuming free membership

  constructor(private moviesService: MoviesService) {}
  ngOnInit() {
    this.fetchProducts(1)
  }

  fetchProducts(page: number) {
    this.moviesService.fetchProductsPage(page).subscribe((data) => {
      this.moviesDataResponse = data.results;
      this.pageSize = data.results.length
    })
  }
}
