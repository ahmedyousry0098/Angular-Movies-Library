import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie, IUniqueMovie } from '../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  moviesDataResponse: IMovie[] = [];
  recommendedMovies: IMovie[] = [];
  pageSize: number = 1;

  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Spinner: NgxSpinnerService
  ) {}

  errMsg?: string = '';
  movieId: number = 0;
  movie?: IUniqueMovie;
  baseURL: string = environment.IMG_BASE_URL;
  genre_Id: number[] = [];

  ngOnInit() {
    this._Spinner.show();
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.movieId = +params.get('id')!;
    });
    this.fetchProduct(this.movieId);
  }

  fetchProduct(id: number) {
    this._MoviesService.fetchProductById(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.fetchProducts(this.pageSize);
        this._Spinner.hide();
      },
      error: (err) => {
        this.errMsg = err;
        this._Spinner.hide();
      },
    });
  }
  fetchProducts(page: number) {
    this._MoviesService.fetchProductsPage(page).subscribe((data) => {
      this.moviesDataResponse = data.results;
      this.pageSize = data.results.length;

      this.genre_Id = this.movie?.genres.map((id) => id.id) || [];
      this.moviesDataResponse.forEach((recommendedMovies) => {
        if (
          recommendedMovies.genre_ids.some((r) => this.genre_Id.includes(r))
        ) {
          this.recommendedMovies.push(recommendedMovies);
        }
      });
    });
  }
}
