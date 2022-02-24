const joi = require('joi');

const id = joi.number().integer();
const customerId = joi.number().integer();
const recepcion = joi.date();
const cnt= joi.number().integer();
const precio = joi.number();
const notaId = joi.number().integer();
const productId = joi.number().integer();
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

});
const addItemSchema = joi.object({
  cnt: cnt.required(),
  precio: precio.required(),
  notaId: notaId.required(),
  productoId: productId.required(),

});

const updateNotaPedido = joi.object({
  customerId,
  recepcion

});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,
  getNotaDePedido,
  updateNotaPedido,
  filtrarFechaRecepcion,
  addItemSchema
};
