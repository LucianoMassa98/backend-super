const joi = require('joi');

const id = joi.string();
const emisor = joi.string();
const emision = joi.date();
const receptores = joi.object([]);

const lp=joi.object([{
  id: id.required(),
  cnt: joi.number(),
  precio: joi.number()
}]);


const createRemito = joi.object({
  emisor: emisor.required(),
  emision: emision.required(),
  receptores: receptores.required(),
  lp: lp.required()
});

const updateRemito = joi.object({

  lp: lp.required()

});

const getRemito = joi.object({
  id: id.required()
});
const filtrarFechaRemito =joi.object({
  emision: emision.required()
});

module.exports ={createRemito,getRemito,updateRemito,filtrarFechaRemito};
