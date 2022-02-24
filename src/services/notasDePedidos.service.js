const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');
class NotaPedidoService{

  constructor(){

  }

   async Crear(ntp){
    const newntp = await models.Notapedido.create(ntp);
    return newntp;
  }

  async additem(data){
    const newitem = await models.NotaProducto.create(data);
    return newitem;
  }
  async Actualizar(id,changes){
     const model = await this.BuscarporID(id);
    const rta = await model.update(changes);
    return rta;
    }
  async Borrar(id){
    const ntp = await this.BuscarporID(id);
    await ntp.destroy();
    return { rta: true };
  }
  async Buscar(){
    const ntps = await models.Notapedido.findAll();
    return ntps;
   }
  async BuscarporID(id){
    const ntp = await models.Notapedido.findByPk(id,
      {
        include: [
          {
            association: 'customer',
            include: ['user']
          },
          'items'
        ]
      });

    if(!ntp){
      throw boom.notFound('Nota de pedido no encontrada');
    }

    return ntp;

  }
  async BuscarporFecha(fecha){
    const ntps = await models.Notapedido.findCreateFind(fecha);
    return ntps;

  }



}

module.exports = NotaPedidoService;
