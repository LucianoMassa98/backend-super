const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const apellido = Joi.string();
const celular =  Joi.string();
const direccion = Joi.string();
const email = Joi.string().email();
const imagen = Joi.string().uri();


const getClienteSchema = Joi.object({
  id: id.required(),
});

const createClienteSchema = Joi.object({
  customerId: id.required()
});

const updateClienteSchema = Joi.object({
  customerId: id.required()
});

module.exports = { getClienteSchema, createClienteSchema, updateClienteSchema };
