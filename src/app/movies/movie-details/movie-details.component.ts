import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { IMovie, IUniqueMovie } from '../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faOutlinedHeart } from '@fortawesome/free-regular-svg-icons';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers: [NgbCarouselConfig],
})
export class MovieDetailsComponent {
  moviesDataResponse: IMovie[] = [];
  recommendedMovies: IMovie[] = [];
  pageSize: number = 1;
  OutlinedHeartIcon = faOutlinedHeart;
  solidHeartIcon = faHeart;

  constructor(
    config: NgbCarouselConfig,
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Spinner: NgxSpinnerService
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  errMsg?: string = '';
  movieId: number = 0;
  movie?: IUniqueMovie;
  baseURL: string = environment.IMG_BASE_URL;
  genre_Id: number[] = [];

  ngOnInit() {
    this._Spinner.show();
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.movieId = +params.get('id')!;
      this._MoviesService.getFavorites().subscribe((favorites) => {
        this.fetchProduct(this.movieId);
      });
      this.fetchRecommendedMovies(this.movieId);
    });
  }

  fetchProduct(id: number) {
    this._MoviesService.fetchProductById(id).subscribe({
      next: (movie) => {
        this._MoviesService.amIFavorite(movie);
        this.movie = movie;
        this._Spinner.hide();
      },
      error: (err) => {
        this.errMsg = err;
        this._Spinner.hide();
      },
    });
  }
  fetchRecommendedMovies(movieId: number) {
    this._MoviesService.fetchRecommendedMovies(movieId).subscribe((data) => {
      this.recommendedMovies = data.results.filter(
        (movie) => movie.poster_path
      );
    });
  }
  toggleFavorite(movie: IUniqueMovie) {
    this._MoviesService.setFavorites(movie, !movie.is_Fav);
  }
}
