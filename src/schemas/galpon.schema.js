const joi = require('joi');

const nombre = joi.string();
const cod = joi.string().uuid();
const cnt = joi.number().max(-1);
const mp = joi.object([{
  cod: cod.required(),
  cnt: cnt.required()
}]);

const createGalpon = joi.object({
nombre: nombre.required(),
mp: mp.required()
});
const updategalpon = joi.object({
  mp: mp.required()
});

const getgalpon= joi.object({
  nombre:nombre.required()
});


module.exports = {
  createGalpon,
  updategalpon,
  getgalpon

};
