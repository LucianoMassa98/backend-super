const joi = require('joi');


const id  = joi.string();
const codigo  = joi.string();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();
const cantidad =  joi.number().positive();


const createProductoSchema = joi.object({
  precio: precio.required(),
  codigo: codigo.required(),
  nombre: nombre.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
});

const updateProductoSchema = joi.object({
  nombre: nombre.required(),
  cantidad: cantidad.required(),
  precio: precio.required()
});

const getProductoSchema = joi.object({
  id: id.required()
});
const getProductoSchemaBarra = joi.object({
  codigo: codigo.required()
});


module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema,
  getProductoSchemaBarra

  };
