const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');
class NotaPedidoService{

  constructor(){
    this.notasdepedidos=[];
    this.generador();
  }
   // genera espacio en la memoria principal del servidor
   generador(){

    this.notasdepedidos = [
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
   async Crear(ntp){
    const newntp = await models.Notapedido.create(ntp);
    return newntp;
  }
  // actualiza ntps
  async Actualizar(id,changes){
    if(!this.BuscarporID(id)){
      throw boom.notFound('Nota de pedido no encontrada');
    }
    // actualizar en base de datos

    }
  //borra ntps por medio del id
  async Borrar(id){
    if(!this.BuscarporID(id)){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return {message:true};
    // actualizar en base de datos
  }

  async BuscarporID(id){
    const ntp = await models.notapedido.findByPk(id);

    if(!ntp){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;

  }
  async BuscarporFecha(fecha){
    return [];
  }

  async Buscar(){

    const ntps = await models.Notapedido.findAll();
    return ntps;
  }

  async Entregado(id,receptor){

    return {message: true};
  }

}

module.exports = NotaPedidoService;
