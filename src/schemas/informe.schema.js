const Joi = require('joi');

const id = Joi.number().integer();
const cajaId = Joi.number().integer();
const userId = Joi.number().integer();
const  fechaDesde= Joi.date();
const  fechaHasta= Joi.date();

const getInformeSchema = Joi.object({
  id: id.required()
});
const queryZ = Joi.object({
  cajaId,
  userId,
  fechaDesde,
  fechaHasta
});


module.exports = { getInformeSchema,queryZ }
