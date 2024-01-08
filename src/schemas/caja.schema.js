const joi = require('joi');


const ids  = joi.number().integer();
const textos = joi.string().min(3);


const createCajaSchema = joi.object({


  nombre: textos.required()

});

const updateCajaSchema = joi.object({

  nombre: textos
});

const getCajaSchema = joi.object({
  id: ids.required()
});


module.exports = {

  createCajaSchema,
  updateCajaSchema,
  getCajaSchema

  };
