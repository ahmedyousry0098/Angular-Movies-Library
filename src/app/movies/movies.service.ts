import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {Observable} from 'rxjs'
import { IMovie, IMovieResponse } from './interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { }

  fetchProductsPage(page: number = 1): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(`${environment.BASE_URL}/movie/popular`, {
      params: {
        page
      }
    })
  }

  fetchProductById(id: number): Observable<IMovie> {
    return this._HttpClient.get<IMovie>(`${environment.BASE_URL}/movie/${id}`)
  }

  fetchRecommendedMovies(movieId: number): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(`${environment.BASE_URL}/movie/${movieId}/recommendations`)
  }

  searchMovie(movieName: string): Observable<IMovieResponse> {
    return this._HttpClient.get<IMovieResponse>(`${environment.BASE_URL}/search/movie`, {
      params: {
        query: movieName
      }
    })
  }
}
