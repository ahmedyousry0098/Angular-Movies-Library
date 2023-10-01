import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  moviesDataResponse: IMovie[] = [];
  upcomingMovies: IMovie[] = []
  topRatedMovies: IMovie[] = []
  ngbPage: number = 1
  pageSize: number = 20
  collectionSize: number = 10000 // assuming free membership

  constructor(
    private moviesService: MoviesService,
    private _Router: Router,
    private _Spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this._Spinner.show()
    this.fetchUpcomingMovie()
    this.fetchTopRatedMovies()
  }

  fetchMovies(page: number) {
    this.moviesService.fetchProductsPage(page).subscribe((data) => {
      this.moviesDataResponse = data.results.filter(movie => movie.poster_path && !movie.adult && movie.title);
      this.pageSize = data.results.length
    })
  }

  handleSearch(searchTerm: string) {
    this._Router.navigateByUrl('search', {
      state: {
        term: searchTerm
      }
    })
  }

  fetchUpcomingMovie() {
    this.moviesService.fetchUpcomingMovies().subscribe({
      next: (response) => {
        this.upcomingMovies = response.results.filter(movie => movie.poster_path && !movie.adult && movie.title)
      },
      error: (err) => {
        this._Spinner.hide()
        console.log(err)
      }
    })
  }

  fetchTopRatedMovies() {
    this.moviesService.fetchTopRatedMovies().subscribe({
      next: (response) => {
        this._Spinner.hide()
        this.topRatedMovies = response.results.filter(movie => movie.poster_path && !movie.adult && movie.title)
      },
      error: (err) => {
        this._Spinner.hide()
        console.log(err)
      }
    })
  }
}
