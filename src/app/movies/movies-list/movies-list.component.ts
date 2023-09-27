import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { IMovie, IMovieResponse } from '../interfaces/movie.interface';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent {
  moviesDataResponse: IMovie[] = [];
  favMovie!: IMovie;
  favMovieId!: number;
  faHeart = faHeart;
  constructor(private moviesService: MoviesService) {}
  ngOnInit() {
    this.moviesService.fetchProductsPage().subscribe((data) => {
      console.log(data.results);
      this.moviesDataResponse = data.results;
    });
  }
  addMovieToFav(id: number) {
    this.favMovieId = id;
    this.moviesDataResponse.forEach((movie) => {
      if (movie.id === this.favMovieId) {
        movie.is_Fav = !movie.is_Fav;
      }
    });
  }
}
