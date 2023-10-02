import { Component } from '@angular/core';
import { MoviesService } from '../../movies/services/movies.service';
import { IMovie } from 'src/app/movies/interfaces/movie.interface';
@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.css'],
})
export class WishListPageComponent {
  allFavoriteMovies: IMovie[] = [];
  constructor(private moviesService: MoviesService) {}
  ngOnInit() {
    // this.fetchFavorites(1);
    this.moviesService.getFavorites().subscribe((arr) => {
      this.allFavoriteMovies = arr;
    });
  }
}
