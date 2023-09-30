import { Component, SimpleChange } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesDataResponse: IMovie[] = [];
  ngbPage: number = 1;
  pageSize: number = 20;
  collectionSize: number = 10000; // assuming free membership

  constructor(private moviesService: MoviesService, private _Router: Router) {}
  ngOnInit() {
    this.moviesService.getFavorites().subscribe((favorites) => {
      this.fetchProducts(this.ngbPage);
    });
  }

  fetchProducts(page: number) {
    this.ngbPage = page;
    this.moviesService.fetchProductsPage(page).subscribe((data) => {
      const movies = data.results;
      movies.forEach((movie) => {
        this.moviesService.amIFavorite(movie);
      });
      this.moviesDataResponse = movies;
      this.pageSize = data.results.length;
    });
  }

  handleSearch(searchTerm: string) {
    this._Router.navigateByUrl('search', {
      state: {
        term: searchTerm,
      },
    });
  }
}
