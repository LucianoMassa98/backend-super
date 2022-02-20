const joi = require('joi');


const id  = joi.number().integer();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();
const cantidad =  joi.number().positive();


const createProductoSchema = joi.object({

  nombre: nombre.required(),
  precio: precio.required(),
  cntStock: cantidad.required(),
  precio: precio.required()
});

const updateProductoSchema = joi.object({
  cntStock: cantidad.required(),
  precio: precio.required()
});

const getProductoSchema = joi.object({
  id: id.required()
});


module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema

  };
