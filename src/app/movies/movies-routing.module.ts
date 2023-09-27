import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'details/:id', component: MovieDetailsComponent }
];
import { MoviesListComponent } from './movies-list/movies-list.component';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
