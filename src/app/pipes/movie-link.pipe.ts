import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieLink'
})
export class MovieLinkPipe implements PipeTransform {

  transform(value: any): string {
    const baseLink = "https://image.tmdb.org/t/p/original";
    const userInput = value;
    const firstDigit = value[0];
    if (firstDigit !== "/") {
      return userInput;
    }
    else {
      return baseLink + userInput;
    }
  }

}
