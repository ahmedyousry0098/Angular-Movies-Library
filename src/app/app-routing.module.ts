import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./movies/movies-routing.module').then(
        (module) => module.MoviesRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./wish-list/wish-list-routing.module').then(
        (module) => module.WishListRoutingModule
      ),
},
  {
    path: '**',
    component: PageNotFoundComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
