import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
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
  constructor(private _HttpClient: HttpClient) {}

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
  fetchFavoriteMovies(page: number): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(
      `${environment.BASE_URL}/account/20496778/favorite/movies`,
      {
        params: {
          page,
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

  favHandler(MovieId: number, favorite: boolean): Observable<any> {
    //TODO: Add params like this: {"media_type": "movie", "media_id": 603, "favorite": true}
    return this._HttpClient.post(
      `${environment.BASE_URL}/account/${environment.ACCOUNT_ID}/favorite`,
      {
        media_type: 'movie',
        media_id: MovieId,
        favorite,
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + environment.ACCESS_TOKEN,
        },
      }
    );
  }
}
