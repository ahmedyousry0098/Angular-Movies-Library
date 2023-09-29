import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MoviesService } from '../movies.service';
import { IMovie } from '../interfaces/movie.interface';

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
    private _MoviesService: MoviesService
  ) {
  }
  
  ngOnInit() {
    this._Router.params.subscribe(() => {
      this.searchTerm.next(window.history.state.term)
      this.term = window.history.state.term
      this.searchTerm.asObservable().subscribe(value => {
          this.fetchMovies(value)
      })
    })
  }

  fetchMovies(searchTerm: string) {
    this._MoviesService.searchMovie(searchTerm).subscribe({
      next: (response) => {
        this.movies = response.results.filter(movie => movie.poster_path && movie.title)
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

  changeSearchTerm(newTerm: string) {
    this.searchTerm.next(newTerm)
  }
}
