import { Component } from '@angular/core';
import { MoviesService } from '../../movies/movies.service';
import { IMovie } from 'src/app/movies/interfaces/movie.interface';
@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.component.html',
  styleUrls: ['./wish-list-page.component.css'],
})
export class WishListPageComponent {
  moviesDataResponse: IMovie[] = [];
  ngbPage: number = 1;
  pageSize: number = 20;
  collectionSize: number = 10000; // assuming free membership
  constructor(private moviesService: MoviesService) {}
  ngOnInit() {
    this.fetchFavorites(1);
  }
  fetchFavorites(page: number) {
    this.moviesService.fetchFavoriteMovies(page).subscribe((data) => {
      this.moviesDataResponse = data.results;
      console.log(this.moviesDataResponse);
      
      this.pageSize = data.results.length;
    });
  }
}
