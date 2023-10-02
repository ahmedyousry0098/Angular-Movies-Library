import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingFormat'
})
export class RatingFormatPipe implements PipeTransform {

  transform(rating: number): number {
    return parseInt(Number(rating * 18).toFixed(1))
  }

}
