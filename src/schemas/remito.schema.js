const joi = require('joi');

const id = joi.number();
const customerId = joi.number();
const notaId = joi.number();
const emision= joi.date();



const createRemito = joi.object({
  customerId: customerId.required(),
  notaId: notaId.required()
});

const updateRemito = joi.object({



});

const getRemito = joi.object({
  id: id.required()
});
const filtrarFechaRemito =joi.object({
  emision: emision.required()
});

module.exports ={createRemito,getRemito,updateRemito,filtrarFechaRemito};
