const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const apellido = Joi.string();
const celular =  Joi.string();
const direccion = Joi.string();
const email = Joi.string().email();
const imagen = Joi.string().uri();


const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  nombre: nombre.required(),
  apellido: apellido.required(),
  celular: celular.required(),
  direccion: direccion.required(),
  email: email.required(),
  imagen: imagen
});

const updateCustomerSchema = Joi.object({
  nombre,
  apellido,
  celular,
  direccion,
  email,
  imagen
});

module.exports = { getCustomerSchema, createCustomerSchema, updateCustomerSchema };
