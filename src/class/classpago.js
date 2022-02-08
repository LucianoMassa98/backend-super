import {Cuenta} from './classcuenta';

export default class pago extends Cuenta{

  constructor(codigo,nombre,importe){
  super(codigo,nombre);
  this.importe = importe;
  }
  getimporte(){
      return this.importe;
  }

  setimporte(valor){
      if(valor >= 0){
          this.importe = valor;
          return true;
      }else{ return false;}
  }

}
