import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ConvertTimePipe } from '../pipes/convert-time.pipe';
import { ExtractYearPipe } from '../pipes/extract-year.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    MoviesListComponent,
    MovieCardComponent,
    ConvertTimePipe,
    ExtractYearPipe,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    FontAwesomeModule,
    NgbRating,
    BarRatingModule,
    NgxSpinnerModule.forRoot({ type: 'pacman' }),
    BrowserAnimationsModule,
    NgbPaginationModule,
  ],
})
export class MoviesModule {}