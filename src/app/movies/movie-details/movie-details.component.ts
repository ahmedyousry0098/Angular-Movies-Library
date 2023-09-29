import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IUniqueMovie } from '../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent {
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute,
    private _Spinner: NgxSpinnerService
  ) {}

  errMsg?: string = '';
  movieId: number = 0;
  movie?: IUniqueMovie;
  baseURL: string = environment.IMG_BASE_URL;

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
        this._Spinner.hide();
      },
      error: (err) => {
        this.errMsg = err;
        this._Spinner.hide();
      },
    });
  }
}
