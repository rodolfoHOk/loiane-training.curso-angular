import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray',
})
export class FiltroArrayPipe implements PipeTransform {
  transform(value: string[], ...args: any[]): string[] {
    if (value.length === 0 || args.length === 0) {
      return value;
    }

    let filter = args.toString().toLocaleLowerCase();

    return value.filter((v) => v.toLowerCase().indexOf(filter) != -1);
  }
}
