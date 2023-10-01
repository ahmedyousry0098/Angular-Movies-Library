import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  IMovie,
  IMovieResponse,
  ITopRatedMovies,
  IUniqueMovie,
  IUpcomingMovies,
} from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  favoritesSubject = new BehaviorSubject<IMovie[]>([]);

  constructor(private _HttpClient: HttpClient) {
    this.fetchAllFavorites().subscribe((favoriteMovies) => {
      this.favoritesSubject.next(favoriteMovies);
    });
  }

  fetchProductsPage(page: number = 1): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(
      `${environment.BASE_URL}/movie/popular`,
      {
        params: {
          page,
        },
      }
    );
  }

  fetchProductById(id: number): Observable<IUniqueMovie> {
    return this._HttpClient.get<IUniqueMovie>(
      `${environment.BASE_URL}/movie/${id}`
    );
  }

  fetchRecommendedMovies(movieId: number): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(
      `${environment.BASE_URL}/movie/${movieId}/recommendations`
    );
  }

  searchMovie(movieName: string): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(
      `${environment.BASE_URL}/search/movie`,
      {
        params: {
          query: movieName,
        },
      }
    );
  }
  fetchUpcomingMovies(): Observable<IUpcomingMovies> {
    return this._HttpClient.get<IUpcomingMovies>(`${environment.BASE_URL}/movie/upcoming`)
  }

  fetchTopRatedMovies(): Observable<ITopRatedMovies> {
    return this._HttpClient.get<ITopRatedMovies>(`${environment.BASE_URL}/movie/top_rated`)
  }

  getFavorites() {
    return this.favoritesSubject.asObservable();
  }
  setFavorites(movie: IMovie, favorite: boolean): void {
    this.favHandler(movie.id, favorite).subscribe((response) => {
      console.log(response);
      const favList = this.favoritesSubject.value;
      if (!favorite) {
        const movieIndex: number = favList.findIndex(
          (movieItem: IMovie) => movieItem.id === movie.id
        );
        if (movieIndex !== -1) {
          favList.splice(movieIndex, 1);
        }
      } else {
        favList.push(movie);
      }
      this.favoritesSubject.next(favList);
    });
  }

  //helpers for favorites
  private fetchFavoriteMovies(page: number): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(
      `${environment.BASE_URL}/account/20496778/favorite/movies`,
      {
        params: {
          page,
        },
      }
    );
  }
  /**
   * Using the`fetchFavoriteMovies` function to fetch all favorite pages.
   * @returns [Array<Imovie>]
   */
  private fetchAllFavorites(): Observable<IMovie[]> {
    let x: number = 1;
    let favorites: IMovie[] = [];
    let fetchedList: IMovie[] = [];

    const fetchObservables: Observable<IMovie[]>[] = [];

    do {
      const observable = this.fetchFavoriteMovies(x).pipe(
        map((data) => {
          fetchedList = data.results;
          return data.results;
        })
      );
      fetchObservables.push(observable);

      x++;
      console.log(`ran ${x} times`);
    } while (fetchedList.length > 0);

    return forkJoin(fetchObservables).pipe(
      map((results) => {
        // Combine the results from all HTTP requests into a single array
        results.forEach((fetchedList) => {
          favorites = [...favorites, ...fetchedList];
        });
        this.favoritesSubject.next(favorites);
        return favorites;
      })
    );
  }

  private favHandler(MovieId: number, favorite: boolean): Observable<any> {
    // {"media_type": "movie", "media_id": 603, "favorite": true}
    return this._HttpClient.post(
      `${environment.BASE_URL}/account/${environment.ACCOUNT_ID}/favorite`,
      {
        media_type: 'movie',
        media_id: MovieId,
        favorite,
      }
    );
  }

  amIFavorite(movie: IMovie) {
    const existedMovie = this.favoritesSubject.value.find(
      (favMovie) => favMovie.id === movie.id
    );
    if (existedMovie) {
      movie.is_Fav = true;
    } else {
      movie.is_Fav = false;
    }
  }
}
