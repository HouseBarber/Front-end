import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeMenu'
})
export class PipeMenuPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value){
      case 'Home': return 'home';
      case 'Perfil': return 'person';
    }
    return 'code';
  }

}
