import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from '../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  faHeart = faHeart;
  movie!: IMovie;
  @Input() moviesDataResponse: IMovie[] = [];
  @Input() recommendedMovies: IMovie[] = [];
  favMovie!: IMovie;
  favMovieId!: number;

  addMovieToFav(id: number) {
    this.favMovieId = id;
    this.moviesDataResponse.forEach((movie) => {
      if (movie.id === this.favMovieId) {
        movie.is_Fav = !movie.is_Fav;
      }
    });
  }
}
