const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const monto = Joi.number().integer();
const cajaId =  Joi.number().integer();
const fechaDesde=Joi.date();
const diferencia=Joi.number();

const fechaHasta= Joi.date();

const getAperturaCajaSchema = Joi.object({
  id: id.required(),
});

const createAperturaCajaSchema = Joi.object({
  userId: userId.required(),
  monto: monto.required(),
  cajaId: cajaId.required(),
  diferencia: diferencia.required()
});
const queryAperturaCajaSchema = Joi.object({
  userId,
  cajaId,
  fechaDesde,
  fechaHasta: Joi.when('fechaDesde', {
    is: Joi.exist(),
    then: Joi.date().min(Joi.ref('fechaDesde')).required(),
  })
});



module.exports = { getAperturaCajaSchema, createAperturaCajaSchema,queryAperturaCajaSchema };
