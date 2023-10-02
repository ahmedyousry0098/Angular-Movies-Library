import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOutlineStar } from '@fortawesome/free-regular-svg-icons';
import {
  IMovie,
  IUniqueMovie,
} from 'src/app/movies/interfaces/movie.interface';
import { MoviesService } from '../../movies/services/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.css'],
})
export class WishCardComponent {
  @Input() movie!: IMovie | IUniqueMovie;
  rate!: number;
  heartIcon = faHeart;
  starIcon = faStar;
  outlinedStarIcon = faOutlineStar;
  constructor(private moviesService: MoviesService, private router: Router) {}
  ngOnInit(): void {
    if (this.movie.vote_average) {
      this.rate = Math.round(this.movie.vote_average / 2);
    } else {
      this.rate = 0;
    }
  }

  removeFromFavorite(movie: IMovie | IUniqueMovie): void {
    this.moviesService.setFavorites(movie, false);
  }
}
