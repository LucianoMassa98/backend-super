const joi = require('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();
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
  customerId: customerId.required(),
  recepcion: recepcion.required()
  /*pagos: pagos.required(),
  lp: lp.required()*/
});

const updateNotaPedido = joi.object({
  recepcion

});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,
  getNotaDePedido,
  updateNotaPedido,
  filtrarFechaRecepcion
};
