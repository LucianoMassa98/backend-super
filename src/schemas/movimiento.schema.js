const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const monto = Joi.number().integer();
const cajaId =  Joi.number().integer();
const fechaDesde=Joi.date();
const ingreso=Joi.boolean();

const fechaHasta= Joi.date();

const getMovimientoSchema = Joi.object({
  id: id.required(),
});

const createMovimientoSchema = Joi.object({
  userId: userId.required(),
  monto: monto.required(),
  cajaId: cajaId.required(),
  ingreso: ingreso
});
const queryMovimientoSchema = Joi.object({
  userId,
  cajaId,
  fechaDesde,
  fechaHasta: Joi.when('fechaDesde', {
    is: Joi.exist(),
    then: Joi.date().min(Joi.ref('fechaDesde')).required(),
  })
});

const updateMovimientoSchema = Joi.object({
  userId,
  monto,
  cajaId
});

module.exports = { getMovimientoSchema, createMovimientoSchema, updateMovimientoSchema,queryMovimientoSchema };
