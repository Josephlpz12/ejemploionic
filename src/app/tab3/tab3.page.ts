import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  usuariopassword: any = {};
  usuario:any = {};
  constructor(private http:HttpClient) {
    let t = localStorage.getItem("usuario");
    if(t){
      this.usuario = JSON.parse(t);
    }

  }

  buscarUsuario(){
    this.servicioBuscarUsuario().subscribe(
      (a:any)=>this.usuariopassword = a
    )
  }
  
  servicioBuscarUsuario():Observable<any>{
    return this.http.get<any>("http://localhost:8080/usuario/buscar");
  }


  ModificarPassword(){
    let validarFormulario:any = document.getElementById("passwordForm");
    if(validarFormulario.reportValidity()){
      this.servicioGuardar().subscribe((a:any) => this.actualizar = a)
      console.log(this.usuario);
      this.limpiarFormulario();
    }
  }

  servicioGuardar(){
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    this.usuario.password = this.usuariopassword.password;
    return this.http.post("http://localhost:8080/usuario/guardar",this.usuario,httpOptions);
  }

  actualizar(u:any){
    this.usuariopassword = {};
  }

  limpiarFormulario(){
    alert("Contraseña modificadda exitosamente.")
    this.usuariopassword = {};
  }


  logout(){
    localStorage.clear();
    location.reload();
  }

}
