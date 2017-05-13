import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'facebookUrlPipe'})
export class FacebookUrlPipe implements PipeTransform {
  transform(value1: String,value2:String): String {
    return '<a target="_blank" href="https://www.facebook.com/' +value1+'">'+ value2 + '</a>';
  }
}