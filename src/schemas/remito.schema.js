const joi = require('joi');

const id = joi.number();
const customerId = joi.number();
const notadpId = joi.number();
const emision= joi.date();
const cnt = joi.number();
const precio = joi.number();
const compraId = joi.number();
const productoId = joi.number();

const createRemito = joi.object({
  customerId: customerId.required(),
  numero: joi.number(),
  notaid: notadpId.required()
});
const addItemSchema = joi.object({
  cnt: cnt.required(),
  precio: precio.required(),
  compraId: compraId.required(),
  productoId: productoId.required(),

});

const updateRemito = joi.object({



});

const getRemito = joi.object({
  id: id.required()
});
const filtrarFechaRemito =joi.object({
  emision: emision.required()
});

module.exports ={createRemito,getRemito,updateRemito,filtrarFechaRemito,addItemSchema};
