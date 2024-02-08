import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lugares'
})
export class LugaresPipe implements PipeTransform {

  transform(value: number, lugares: any[]): String {
    let l : any;
    for(l of lugares){
      if(l.idlugar == value){
        return l.nombre;
      }
    }
    return "No hay informacion";
  }


  
}
