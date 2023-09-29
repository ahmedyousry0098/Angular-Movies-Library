import { Component, Input } from '@angular/core';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faOutlineStar } from '@fortawesome/free-regular-svg-icons';
import { IMovie } from 'src/app/movies/interfaces/movie.interface';

@Component({
  selector: 'app-wish-card',
  templateUrl: './wish-card.component.html',
  styleUrls: ['./wish-card.component.css'],
})
export class WishCardComponent {
  @Input() movie!: IMovie;
  rate!: number;
  heartIcon = faHeart;
  starIcon = faStar;
  outlinedStarIcon = faOutlineStar;
  ngOnInit(): void {
    this.rate = Math.round(this.movie.vote_average / 2);
  }
}
