import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extractYear'
})
export class ExtractYearPipe implements PipeTransform {

  transform(date: string): number {
    const year = new Date(date).getFullYear()
    return year;
  }

}
