import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTime'
})
export class ConvertTimePipe implements PipeTransform {

  transform(minutes: number): string {
    const hrs = Math.floor(minutes/60)
    const mins = Math.floor(minutes % 60)
    return `${hrs}h ${mins}m`;
  }
}
