
// creo formulario de operacion
export default class formulario{

  constructor(codigo, fechaemision,emisor, receptor){
      this.codigo = codigo;
      this.fechaemision = fechaemision;
      this.fecharecepcion = null;
      this.emisor = emisor;
      this.receptor = receptor;

  }

  getcodigo(){
      return this.codigo;
  }

  getfechaemision(){
      return this.fechaemision;
  }

  getfecharecepcion(){
      return this.fecharecepcion;
  }

  setfechaderecepcion(valor){
      if(this.fecharecepcion <= valor){
          this.fecharecepcion = valor;
          return true;
      }else{ return false;}

  }
  getreceptor(){
      return this.receptor;
  }

  setreceptor(valor){
      this.receptor = valor;
  }

  getemisor(){
      return this.emisor;
  }
}
