const joi = require('joi');


const id  = joi.number().integer();
const nombre = joi.string().min(3);
const precio =  joi.number().positive();
const cnt =  joi.number().integer();
const categoryId = joi.number().integer();


const createProductoSchema = joi.object({

  nombre: nombre.required(),
  cnt: cnt.required(),
  precio: precio.required(),
  categoryId:categoryId.required()

});

const updateProductoSchema = joi.object({
  nombre,
  cnt,
  precio,
  categoryId
});

const getProductoSchema = joi.object({
  id: id.required()
});


module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema

  };
