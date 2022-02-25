const joi = require('joi');

const galponId =joi.number();
const id = joi.number();
const cnt = joi.number();
const produccionId= joi.number();
const productoId= joi.number();
const createRemitoProduccion = joi.object({
  galponId: galponId.required()
});
const getRemitoProduccion = joi.object({
  id: id.required()
});
const addItemSchema = joi.object({
  cnt: cnt.required(),
  produccionId: produccionId.required(),
  productoId: productoId.required(),

});
const addItemProducidoSchema = joi.object({
  cnt: cnt.required(),
  producidoId: produccionId.required(),
  productoId: productoId.required(),

});
const addItemEnvioSchema = joi.object({
  cnt: cnt.required(),
  envioId: produccionId.required(),
  productoId: productoId.required(),

});
module.exports={createRemitoProduccion,getRemitoProduccion,
  addItemSchema,addItemProducidoSchema,addItemEnvioSchema};
