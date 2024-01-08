const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const codigo = Joi.string();


const getCuentaSchema = Joi.object({
  id: id.required(),
});

const createCuentaSchema = Joi.object({
  nombre: nombre.required(),
  codigo: codigo.required()
});

const updateCuentaSchema = Joi.object({
  nombre,
  codigo
});

module.exports = { getCuentaSchema, createCuentaSchema, updateCuentaSchema };
