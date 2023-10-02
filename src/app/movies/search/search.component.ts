import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { IMovie } from '../interfaces/movie.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchTerm = new BehaviorSubject<string>('')
  movies?: IMovie[]
  term!: string 

  constructor(
    private _Router: ActivatedRoute,
    private _MoviesService: MoviesService,
    private _Spinner: NgxSpinnerService
  ) {
  }
  
  ngOnInit() {
    this._Spinner.show()
    this._Router.params.subscribe(() => {
      this.searchTerm.next(window.history.state.term)
      this.term = window.history.state.term
      this.searchTerm.asObservable().subscribe(value => {
          this.fetchMovies(value)
          this._MoviesService.getFavorites().subscribe((favorites) => {
            this.fetchMovies(value)
          })
      })
    })
  }

  fetchMovies(searchTerm: string) {
    this._MoviesService.searchMovie(searchTerm).subscribe({
      next: (response) => {
        this.movies = response.results.filter(movie => movie.poster_path && movie.title)
        this.movies.forEach((movie) => {
          this._MoviesService.amIFavorite(movie);
        });
        this._Spinner.hide()
      }, 
      error: (err) => {
        this._Spinner.hide()
        console.log(err);
      }
    })
  }

  changeSearchTerm(newTerm: string) {
    this.searchTerm.next(newTerm)
  }
}
