import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListPageComponent } from './wish-list-page/wish-list-page.component';
import { WishCardComponent } from './wish-card/wish-card.component';
import { WishNoneComponent } from './wish-none/wish-none.component';
import { WishListRoutingModule } from './wish-list-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ClipTextPipe } from '../pipes/clip-text.pipe';

@NgModule({
  declarations: [WishListPageComponent, WishCardComponent, WishNoneComponent, ClipTextPipe],
  imports: [CommonModule, WishListRoutingModule, FontAwesomeModule, NgbRating],
})
export class WishListModule {}
