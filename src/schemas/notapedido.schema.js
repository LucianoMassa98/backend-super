const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const cajaId = joi.number().integer();

const  fechaDesde= joi.date();
const  fechaHasta= joi.date();


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
const queryNotas = joi.object({
  cajaId,
  userId,
  fechaDesde,
  fechaHasta
});

const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={
  getNotaDePedido,
  queryNotas,
  createNotaPedidoTotal
};
