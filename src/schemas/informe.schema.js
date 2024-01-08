const Joi = require('joi');

const id = Joi.number().integer();

const getInformeSchema = Joi.object({
  id: id.required()
});


module.exports = { getInformeSchema }
