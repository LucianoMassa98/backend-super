const boom = require('@hapi/boom');
const formularioService = require('./formulario.service');

class NotaPedidoService extends formularioService{

  constructor(){
    super();
    this.generador();
  }
   // genera espacio en la memoria principal del servidor
   generador(){

    super.formularios = [
      {
      id: 1,
      tipo: 'NTP',
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1','1.1.6.1'],
      mensaje:{
              numero: 1,
              pagos: {
                efectivo:0,
                cuenta_corriente: 120,
                debito: 150
              },
              lp:[{},{}]
             }
      }

    ];
  }
  // create
   async Crear(formulario){
    // falta guardar en base de datos
    return  super.CrearEnArray(formulario);
  }
  // actualiza formularios
  async Actualizar(id,changes){
    // falta guardar en base de datos
  return super.ActualizarEnArray(id,changes);
    }
  //borra formularios por medio del id
  async Borrar(id){
   // falta borrar en base de datos la nota de pedido
    return super.BorrarEnArray(id);
  }


}

module.exports = NotaPedidoService;
