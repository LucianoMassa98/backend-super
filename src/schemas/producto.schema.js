const joi = require('joi');


const id  = joi.string().uuid();
const nombre = joi.string().alphanum().min(3).max(15);
const precio =  joi.number().positive();

const createSchemaProducto = joi.object({



});
