//importa clase Cuenta
import {Cuenta} from './classcuenta'
//crea clase producto y la exporta
export class producto extends Cuenta{

  constructor(codigo, codbarra, nombre,cantidad, precio){
      alert("entro");
      super(codigo,nombre);
      this.codbarra = codbarra;
      this.cantidad = cantidad;
      this.precio = precio;

       if((cantidad <= 0 )||( precio <= 0)){ return null;}
  }

retcodbarra(){return this.codbarra;}
retprecio(){ return this.precio;}
retcnt(){ return this.cantidad;}
nuevoprecio(valor){  this.precio = valor;}
retimporte(){ return this.cantidad * this.importe;}
addcantidad(valor){ this.cantidad += valor;}
rescantidad(valor){this.cantidad = this.cantidad - valor;}

}
