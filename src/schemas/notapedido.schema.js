const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const cajaId = joi.number().integer();

const  fechaDesde= joi.date();
const  fechaHasta= joi.date();


const createNotaPedido = joi.object({
  userId: userId.required(),
  cajaId: cajaId.required(),
  clienteId: id.required()
});
const productoSchema = joi.object({
  productoId: id.required(),
  cnt: joi.number().integer().min(1).required(),
  precio: joi.number().min(0).required()
});

const cobroSchema = joi.object({
  cuentaId: id.required(),
  monto: joi.number().min(0).required()
});
const createNotaPedidoTotal = joi.object({
  userId: userId.required(),
  cajaId: cajaId.required(),
  clienteId: id.required(),
  productos: joi.array().items(productoSchema).required(),
  cobros: joi.array().items(cobroSchema).required()
});

const addItemSchema = joi.object({

  notaId: id.required(),
  productoId: id.required(),
  cnt: joi.number().integer().required(),
  precio:joi.number().positive().required()

});
const subItemSchema = joi.object({
  notaId: id.required(),
  productoId: id.required()
});

const queryNotas = joi.object({
  cajaId,
  fechaDesde,
  fechaHasta
});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,
  getNotaDePedido,
  subItemSchema,
  addItemSchema,
  queryNotas,
  createNotaPedidoTotal
};
