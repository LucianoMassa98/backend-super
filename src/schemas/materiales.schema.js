const joi = require('joi');


const id  = joi.string().uuid();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();
const cantidad =  joi.number().positive();


const createMaterialesSchema = joi.object({
  precio: precio.required(),
  nombre: nombre.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
});

const updateMaterialesSchema = joi.object({
  nombre: nombre.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
});

const getMaterialesSchema = joi.object({
  id: id.required()
});

module.exports = {

  createMaterialesSchema,
  updateMaterialesSchema,
  getMaterialesSchema
  };
