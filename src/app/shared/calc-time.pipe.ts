import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcTime'
})
export class CalcTimePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {    
      //                     HOURS                      MINUETS      
    return Math.floor( value/1000/60/60 )+ ' h : ' + value/1000/60%60 + ' m ';
  }


}
