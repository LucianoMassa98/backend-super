const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const cajaId = joi.number().integer();



const createNotaPedido = joi.object({
  userId: userId.required(),
  cajaId: cajaId.required(),
  clienteId: id.required()
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



const getNotaDePedido = joi.object({
  id: id.required()
});

module.exports ={createNotaPedido,
  getNotaDePedido,
  subItemSchema,
  addItemSchema
};
