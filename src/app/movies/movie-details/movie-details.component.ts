import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie } from '../interfaces/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  constructor(
    private _MoviesService: MoviesService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  isLoading: boolean = false
  errMsg?: string = ''
  movieId: number = 0
  movie?: IMovie
  baseURL: string = environment.IMG_BASE_URL

  ngOnInit() {
    this.isLoading = true
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.movieId = +params.get('id')!
    })
    this.fetchProduct(this.movieId)
  }

  fetchProduct(id: number) {
    this._MoviesService.fetchProductById(id).subscribe({
      next: (movie) => {
        console.log(movie);
        
        this.isLoading = false
        this.movie = movie
      },
      error: (err) => {
        this.isLoading = false
        this.errMsg = err
      }
    })
  }
}
