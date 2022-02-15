const joi = require('joi');


const id  = joi.string().uuid();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();

const createProductoSchema = joi.object({
nombre: nombre.required(),
precio: precio.required()
});

const updateProductoSchema = joi.object({

});

const getProductoSchema = joi.object({

});


module.exports = {

  createProductoSchema,
  updateProductoSchema,
  getProductoSchema

  };
