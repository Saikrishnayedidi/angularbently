import { Pipe, PipeTransform } from '@angular/core';
  
@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
  
  transform(number:any) {
    number = number.charAt(0) != 0 ? "0" + number : "" + number;
  
    let newStr = "";
    let i = 0;
  
    for (; i < Math.floor(number.length / 3) - 1; i++) {
      newStr = newStr + "(" + number.substr(i * 3, 3) + ")";
    }
  
    return newStr + number.substr(i * 2);
  }
  
} 