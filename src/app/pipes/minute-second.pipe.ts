import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSecond'
})
export class MinuteSecondPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return hours + 'h ' + minutes + 'm';
  }

}
