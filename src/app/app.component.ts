import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 sesionIniciada:boolean = false;
  mostrarCrearCuenta : Boolean = false;
  usuarioNuevo:any = {};

  usuario:any ={};

  constructor(private htpp:HttpClient) {

    let t = localStorage.getItem("usuario");
    if(t){
      this.sesionIniciada = true;
    }
    else{
      this.sesionIniciada = false;
    }

  }

  login(){
    if(this.usuario.correo && this.usuario.password 
      && this.usuario.correo != "" && this.usuario.password!=""){
        this.servicioLogin().subscribe(
          (u:any) => this.darBienvenida(u)
        )
    }
    else{
      alert("Usuario o password no ingresado")
    }
  }

  darBienvenida(usuario:any){
    if(usuario){
      let t = JSON.stringify(usuario);
      localStorage.setItem("usuario",t);
      this.sesionIniciada = true;
    }
    else{
      alert("Usuario o password invalido.")
    }
  }

  servicioLogin(){
    let httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
  }

  return this.htpp.post(
    "http://localhost:8080/usuario/login",
    this.usuario,
    httpOptions);
  }

  crearCuenta(){
    this.mostrarCrearCuenta = true;
  }

  crear(){
    this.usuarioNuevo.fechaCreacion = new Date();
      this.servicioGuardar().subscribe(
        (u:any) => this.actualizar(u)
      )

  }

  servicioGuardar(){
    let httpOptions ={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
  }

  return this.htpp.post(
    "http://localhost:8080/usuario/guardar",
    this.usuarioNuevo,
    httpOptions);
  }

  actualizar(u:any){
    alert("Usuario creado exitosamente");
    this.mostrarCrearCuenta = false;
    this.usuarioNuevo = {};
    
  }

  cancelar(){
    this.mostrarCrearCuenta =false;
  }
}
