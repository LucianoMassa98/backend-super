const joi = require('joi');

const id = joi.string();
const emisor = joi.string();
const emision = joi.date();
const receptores = joi.object([]);
const recepcion = joi.date();
const pagos = joi.object([{
  id: id.required(),
  monto: joi.number()
}]);
const lp=joi.object([{
  id: id.required(),
  cnt: joi.number(),
  precio: joi.number()
}]);

const filtrarFechaRecepcion =joi.object({
  recepcion: recepcion.required()
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
  recepcion: recepcion.required(),
  pagos: pagos.required(),
  lp: lp.required()

});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,
  getNotaDePedido,
  updateNotaPedido,
  filtrarFechaRecepcion
};
