import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  anuncio:any = [];
    constructor(private http:HttpClient){
      this.buscarAnuncios();
    }
  
    buscarAnuncios(){
      this.servicioBuscarAnuncio().subscribe(
        (us:any) => this.anuncio = us
      )
    }
  
    servicioBuscarAnuncio():Observable<any>{
      return this.http.get("http://localhost:8080/anuncio/buscaranuncio");
    }

}
