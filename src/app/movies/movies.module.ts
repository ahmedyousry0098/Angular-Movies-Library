import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieCardComponent } from './movie-card/movie-card.component';

@NgModule({
  declarations: [MoviesListComponent, MovieCardComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FontAwesomeModule,
    NgbRating,
    NgbPaginationModule,
  ],
})
export class MoviesModule {}
