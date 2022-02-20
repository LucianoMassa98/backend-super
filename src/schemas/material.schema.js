const joi = require('joi');


const id  = joi.number().integer();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();
const cantidad =  joi.number().positive();


const createMaterialSchema = joi.object({

  nombre: nombre.required(),
  precio: precio.required(),
  cntStock: cantidad.required(),
  cntProduccion: cantidad.required(),
  precio: precio.required()
});

const updateMaterialSchema = joi.object({
  precio: precio.required()
});

const getMaterialSchema = joi.object({
  id: id.required()
});


module.exports = {

  createMaterialSchema,
  updateMaterialSchema,
  getMaterialSchema

  };
