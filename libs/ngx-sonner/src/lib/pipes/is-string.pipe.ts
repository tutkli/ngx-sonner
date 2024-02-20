import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'isString', standalone: true })
export class IsStringPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return typeof value === 'string';
  }
}
