import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesDataResponse: IMovie[] = []
  ngbPage: number = 1
  pageSize: number = 20
  collectionSize: number = 10000 // assuming free membership

  constructor(
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    this.ngbPage = Number(localStorage.getItem('last-page')) || 1
    this.moviesService.getFavorites().subscribe((favorites) => {
      this.fetchMovies(this.ngbPage);
    })
  }

  fetchMovies(page: number) {
    this.moviesService.fetchProductsPage(page).subscribe((data) => {
      this.moviesDataResponse = data.results.filter(movie => movie.poster_path && !movie.adult);
      this.moviesDataResponse.forEach((movie) => {
        this.moviesService.amIFavorite(movie);
      });
      this.pageSize = data.results.length
    })
    localStorage.setItem('last-page', page.toString())
  }
}
