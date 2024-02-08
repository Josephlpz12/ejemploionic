import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {


  reservas:any = [];
  viaje:any = [];
  estado:any = [];
  usuario:any = {};
  


    constructor(private http:HttpClient){
     this.buscarReservas();
     this.buscarViajes();
     this.buscarestados();

      let t = localStorage.getItem("usuario");
    if(t){
      this.usuario = JSON.parse(t);
    }

    }
  

    buscarViajes(){
      this.servicioBuscarViajes().subscribe(
        (us:any) => this.viaje = us
      )
      for(let viaje of this.viaje){
        console.log(viaje.destino)
      }

    }
  
    servicioBuscarViajes():Observable<any>{
      return this.http.get("http://localhost:8080/viaje/buscar");
    }
   

    buscarReservas(){
      this.servicioBuscarReservas().subscribe(
        (u:any) => this.reservas = u
      )
    }
  
    servicioBuscarReservas():Observable<any>{
      return this.http.get("http://localhost:8080/reservacion/buscar");
    }
   
    buscarestados(){
      this.servicioBuscarestados().subscribe(
        (u:any) => this.estado = u
      )
    }
  
    servicioBuscarestados():Observable<any>{
      return this.http.get("http://localhost:8080/estado/buscar");
    }

    actualizar(u:any){
      this.buscarReservas;
    }
}
