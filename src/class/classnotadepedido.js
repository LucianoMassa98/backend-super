import {formulario} from './classformulario';

export default class NotaDePedido extends formulario{

  constructor(codigo,fechaemision,emisor,receptor){
      super(codigo,fechaemision,fecharecepcion,emisor,receptor,proveedor);
      this.listaproducto = new listproduct();
      this.verificacion = false;
      this.pagos = [];

      this.proveedor = this.proveedor;
  }

  importetotal(){

      sum =0;

      this.listaproducto.retlista().forEach(p =>{

          sum = sum + p.retimporte();
      });

      return sum;
  }

  agregarproducto(p){

      if(this.listaproducto.addproduct(p)==true){
          // se cargo correctamente
      }else{
          //el producto no se pudo cargar
      }
  }

  cantidadproductos(){
      return this.listaproducto.retlista().length();
  }

  setverificacion(){
      this.verificacion = true;
  }
  getverificacion(){
      return this.verificacion;
  }

  getpagos(){
      return this.pagos;
  }
  setpagos(valor){

      this.pagos.pop(valor);
  }


  getlistaproductos(){
      return this.listaproducto;
  }

  }
