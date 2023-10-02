import { Component } from '@angular/core';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-wish-none',
  templateUrl: './wish-none.component.html',
  styleUrls: ['./wish-none.component.css'],
})
export class WishNoneComponent {
  heartcrackIcon = faHeartCrack;
}
