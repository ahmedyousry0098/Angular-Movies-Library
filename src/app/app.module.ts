import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { KeyAttacherInterceptor } from './interceptors/key-attacher.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesModule } from './movies/movies.module';
import { SharedModule } from './shared/shared.module';
import { WishListModule } from './wish-list/wish-list.module';
import { ClipTextPipe } from './pipes/clip-text.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MoviesModule,
    WishListModule,
    SharedModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeyAttacherInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
