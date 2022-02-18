const boom = require('@hapi/boom');

class NotaPedidoService{

  constructor(){
    this.notasdepedidos=[];
    this.generador();
  }
   // genera espacio en la memoria principal del servidor
   generador(){

    super.notasdepedidos = [
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
    // falta guardar en base de datos
    this.notasdepedidos.push(ntp);
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
    // actualizar en base de datos
  }

  async BuscarporID(id){
    const index = this.notasdepedidos.findIndex(item => item.id === id);

    if(index===-1){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return this.notasdepedidos[index];

  }
  async BuscarporFecha(fecha){
    return [];
  }

  async Entregado(id,receptor){

  }

}

module.exports = NotaPedidoService;
