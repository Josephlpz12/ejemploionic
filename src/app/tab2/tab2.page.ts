import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  

  viaje:any = {};
  viajes:any = {};
  lugares:any = [];
  usuario:any = {};
  cupo:any = {};
  nuevareservacion:any={};
  comentario:any = [];
  idviaje:any ={};


  constructor(private http:HttpClient, private alertController: AlertController) {
    this.buscarViajes();
    this.buscarLugares();
    this.buscarComentarios();
    
    let t = localStorage.getItem("usuario");
    if(t){
      this.usuario = JSON.parse(t);
    }
  }

  async presentAlert(viaje:any) {
    const alert = await this.alertController.create({
      header: 'Ingrese informacion',
      buttons: [{
        text:"Aceptar",
        role:"Aceptar",
        handler:(u:any)=>{
          const pasajeros = u.numeropasajeros
          const observaciones = u.observaciones
          this.servicioGuardar(pasajeros, viaje,observaciones).subscribe(
            
          );

          this.servicioViaje(viaje).subscribe(
            (c:any)=> this.actualizar(c)
          );
        }
        
      },
      {
        text:"cancelar",
        role:"Cancelar"
      }
    
    ],

      inputs: [

        {
          name:"numeropasajeros",
          type: 'number',
          placeholder: 'Cantidad de Pasajeros',
          min: 1,
          max: 100,
        },
        {
          name:"observaciones",
          type: 'text',
          placeholder: 'Observaciones',
        },
      ],
    });

    await alert.present();
  }

  async presentAlert2(viaje:any) {
    const alert = await this.alertController.create({
      header: 'Ingrese su Comentario.',
      buttons: [{
        text:"Aceptar",
        role:"Aceptar",
        handler:(u:any)=>{
          const comentario = u.Comentario
       
          this.servicioGuardarComentario(viaje,comentario).subscribe(
            (c:any)=> this.actualizar(c)
          ); 
        }
        
      },
      {
        text:"cancelar",
        role:"Cancelar"
      }
    
    ],

      inputs: [
        {
          name:"Comentario",
          type: 'text',
          placeholder: 'Comentario',
        },
      ],
    });

    await alert.present();
  }

  actualizar(c:any){
   
    location.reload();
  }


  buscarViajes(){
    this.servicioBuscarViajes().subscribe(
      (us:any) => this.viaje = us
    )
  }

  servicioBuscarViajes():Observable<any>{
    return this.http.get("http://localhost:8080/viaje/buscar");
  }


  buscarComentarios(){
    this.servicioBuscarComentario().subscribe(
      (us:any) => this.comentario = us
    )
  }

  servicioBuscarComentario():Observable<any>{
    return this.http.get("http://localhost:8080/comentario/buscar");
  }

  isModalOpen = false;
  setOpen(isOpen: boolean, viaje:any) {
    this.isModalOpen = isOpen;
    this.idviaje = viaje.idviaje
  }

  buscarLugares(){
    this.servicioBuscarLugares().subscribe(
      (l:any)=>this.lugares = l
    )
  }

  servicioBuscarLugares():Observable<any>{
    return this.http.get<any>("http://localhost:8080/lugar/buscar");
  }

  
  servicioGuardar(pasajeros:any,viajes:any, observaciones:any){
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }

    let nuevareservacion;

    if(viajes.cupo >= pasajeros ){
        nuevareservacion = {
        idreservación: "",
        cantidadPasajeros: pasajeros,
        observaciones: observaciones,
        correo: this.usuario.correo,
        idestado: 1,
        idviaje: viajes.idviaje
    }

    const a = viajes.cupo
    const b = pasajeros
    const resultado = a-b
    viajes.cupo = resultado

    alert("Reservacion creada exitosamente")
    }
    else{
      alert("No existen suficientes cupos.")
    }
    
   
    return this.http.post<any>
    ("http://localhost:8080/reservacion/guardar",nuevareservacion,httpOptions);

  }

  servicioViaje(viajes:any){
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }

   
    return this.http.post<any>
    ("http://localhost:8080/viaje/guardar",viajes,httpOptions);

  }

  servicioGuardarComentario(viajes:any, comentario:any){
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    this.nuevareservacion.fecha = new Date();
    this.nuevareservacion.texto = comentario;
    this.nuevareservacion.correo = this.usuario.correo;
    this.nuevareservacion.idviaje = viajes.idviaje;

    alert("Comentario creado exitosamente.")
   
    return this.http.post<any>
    ("http://localhost:8080/comentario/guardar",this.nuevareservacion,httpOptions);

  }

}
