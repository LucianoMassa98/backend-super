const joi = require('joi');


const id  = joi.string().uuid();
const tipo  = joi.string().min(3).max(3);
const emision = joi.date();
const recepcion = joi.date();
const emisor = joi.string();
const receptor =  joi.array();
const mensaje = joi.object({
  numero: joi.number().min(0),
  pagos: joi.object({
    efectivo: joi.number().min(0),
    cuenta_corriente: joi.number().min(0),
    debito: joi.number().min(0)
  }),
  lp: joi.object([{
    id: id.required(),
    cnt: joi.number().min(0),
    precio: joi.number().positive()
  }])
});

const createFormularioSchema = joi.object({
  emision: emision.required(),
  recepcion: recepcion.required(),
  receptor: receptor.required(),
  mensaje: mensaje.required()
});

const updateFormularioSchema = joi.object({
  recepcion: recepcion.required(),
  mensaje: mensaje.required()
});

const getFormularioSchema = joi.object({
  id: id.required()
});


module.exports = {

  createFormularioSchema,
  updateFormularioSchema,
  getFormularioSchema

  };
