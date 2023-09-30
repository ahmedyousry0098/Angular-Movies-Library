import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IMovie } from '../interfaces/movie.interface';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  faHeart = faHeart;
  @Input() moviesDataResponse: IMovie[] = [];
  favMovie!: IMovie;
  favMovieId!: number;
  constructor(private moviesService: MoviesService) {}
  addMovieToFav(event: Event, movie: IMovie): void {
    event.stopPropagation();
    this.moviesService.setFavorites(movie, !movie.is_Fav);
  }
}
