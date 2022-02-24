const joi = require('joi');

const nombre =joi.string();
const id= joi.number();
const createGalponProduccion = joi.object({
  nombre: nombre.required()
});
const getGalponSchema = joi.object({
id:id.required()
});

module.exports={createGalponProduccion,getGalponSchema};
