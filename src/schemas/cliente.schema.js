const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const apellido = Joi.string();
const celular =  Joi.string();
const direccion = Joi.string();
const email = Joi.string().email();
const imagen = Joi.string().uri();
const IVA = Joi.string();
const cuit = Joi.number().positive();

const getClienteSchema = Joi.object({
  id: id.required(),
});

const createClienteSchema = Joi.object({
  customerId: id.required(),
  IVA: IVA.required(),
  cuit: cuit.required()
});

const updateClienteSchema = Joi.object({
  IVA: IVA.required(),
  cuit: cuit.required()
});

module.exports = { getClienteSchema, createClienteSchema, updateClienteSchema };
