import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipText',
})
export class ClipTextPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const desiredLength: number = Number(args[0]);
    if (desiredLength !== undefined) {
      if (value.length > desiredLength) {
        return `${value.substring(0, desiredLength)}...`;
      } else {
        return value.substring(0, desiredLength);
      }
    } else {
      return value;
    }
  }
}
