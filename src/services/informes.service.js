const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');
const NotaPedidoService = require('./notasDePedidos.service');
const { NotaPedido } = require('../db/models/notapedido.model');
const service = new NotaPedido();
class InformesService {


  async X(query) {

    const notas = await service.find(query);

    consolidar(notas);

  }

  async consolidar(notas){

  }
}

module.exports = InformesService;
