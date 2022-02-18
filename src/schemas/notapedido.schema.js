const joi = require('joi');

const id = joi.string();
const emisor = joi.string();
const emision = joi.date();
const receptores = joi.array().string();
const recepcion = joi.date();
const pagos = joi.array({
  id: id.required(),
  monto: joi.number()
});
const lp=joi.array({
  id: id.required(),
  cnt: joi.number();
  precio: joi.number()
});


const createNotaPedido = joi.object({
  emisor: emisor.required(),
  emision: emision.required(),
  receptores: receptores.required(),
  recepcion: recepcion.required(),
  pagos: pagos.required(),
  lp: lp.required()
});

const updateNotaPedido = joi.object({


});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,getNotaDePedido};
