const boom = require('@hapi/boom');
const MaterialService = require('./materiales.service');
const NotaPedidoService = require('./notasDePedidos.service');
class RemitosCompraService{

  constructor(){
    this.remitos=[];
    this.generador();
  }
   // genera espacio en la memoria principal del servidor
   generador(){

    super.remitos = [
      {
      id: 1,
      emision: '11/02/2022',
      recepcion: '20/02/2022',
      emisor: '1.1.5',
      receptor: ['1.1.6.1'],
      pagos:[{},{}],
      lp:[{},{}]

      }

    ];
  }
  // create
   async Crear(rmtC){
    // falta guardar en base de datos
    this.remitos.push(rmtC);
    const servicio = new MaterialService();
    servicio.Agregar(rmtC.lp);
    const servicio2 = new NotaPedidoService();
    servicio2.Entregado(rmtc.id,rmtC.emisor);
  }
  // actualiza remito de copras
  async Actualizar(id,changes){
    if(!this.BuscarporID(id)){
      throw boom.notFound('Remito de compra no encontrado');
    }
    return id;
    // actualizar en base de datos

    }
  //borra ntps por medio del id
  async Borrar(id){
    if(!this.BuscarporID(id)){
      throw boom.notFound('Remito de compra no encontrado');
    }
    // actualizar en base de datos
  }

  async BuscarporID(id){
    const index = this.remitos.findIndex(item => item.id === id);

    if(index===-1){
      throw boom.notFound('Remito de compra no encontrado');
    }

    return this.remitos[index];

  }
  async BuscarporFecha(fecha){
    return [];
  }

}

module.exports = RemitosCompraService;
