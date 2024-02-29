const joi = require('joi');


const ids  = joi.number().integer();
const textos = joi.string().min(1);
const montos =  joi.number().positive();
const enteros =  joi.number().integer();

const createProductoSchema = joi.object({

  codigo: enteros.required(),
  codBarra: textos.required(),
  nombre: textos.required(),
  descripcion:textos.required(),
  precio: montos.required(),
  impuesto: montos.required(),
  marca: textos.required(),
  rubro: textos.required()

});
const updateProductoSchema = joi.object({
  codigo: enteros,
  codBarra: textos,
  nombre: textos,
  descripcion:textos,
  precio: montos,
  impuesto: montos,
  marca: textos,
  rubro: textos
});
const subaPrecioProductoSchema = joi.object({
  marca: textos,
  rubro:textos,
  porcentaje: montos.required()
});

const getProductoSchema = joi.object({
  id: ids,
  codigo: enteros,
  codBarra: textos
});


const getProductosSchema = joi.object({
  texto: textos,
  limit: enteros,
   offset: enteros.required()
});

module.exports = {

  createProductoSchema,
  getProductosSchema,
  updateProductoSchema,
  getProductoSchema,
  subaPrecioProductoSchema
  };
