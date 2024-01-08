const Joi = require('joi');

const id = Joi.number().integer();
const notaId = Joi.number().integer();
const cuentaId = Joi.number().integer();
const monto =  Joi.number().positive();


const getCobroSchema = Joi.object({
  id: id.required(),
});

const createCobroSchema = Joi.object({
  notaId: notaId.required(),
  cuentaId: cuentaId.required(),
  monto: monto.required()
});

const updateCobroSchema = Joi.object({
  notaId,
  cuentaId,
  monto
});

module.exports = { getCobroSchema, createCobroSchema, updateCobroSchema };
