const Joi = require('joi');

const id = Joi.number().integer();
const IVA = Joi.string();
const cuit = Joi.string();

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
