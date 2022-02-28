const express = require('express');
const router = express.Router();
const RemitosProduccionService =require('../services/remitosProduccion.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createRemitoProduccion,getRemitoProduccion,addItemSchema} = require('../schemas/remitoproduccion.schema');
const {filtrarFechaRemito} = require('../schemas/remito.schema');

const servicio = new RemitosProduccionService();

//cliente solicita lista de formularios: RMT
router.get('/',async(req,res,next)=>{
  try{
    const remitosproduccion = await servicio.Buscar();
  res.json(remitosproduccion);
  }catch(error){next(error);}

});
// filtrar formularios: RMT por fecha
router.get('/BuscarporFecha',
validatorHandler(filtrarFechaRemito,'body'),
async (req,res,next)=>{
  try{
    const body = req.body;
  const remitoscompras = await servicio.BuscarporFecha(body);
  res.json(remitoscompras);
  //devolver lista de notas de pedidos filtradas por fecha
}catch(error){next(error);}
  });
//cliente solicita formulario: RMT por id
router.get('/:id',
validatorHandler(getRemitoProduccion,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const rmtEnP = await servicio.BuscarporID(id);
  res.json(rmtEnP);
  }catch(error){next(error);}
});
//cliente agrega formulario: RMT
router.post('/',
validatorHandler(createRemitoProduccion,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtEnP = await servicio.Crear(body);
  res.json(rmtEnP);
  }catch(error){next(error);}

});
router.post('/agregar',
validatorHandler(addItemSchema,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const rmtEnP = await servicio.additem(body);
  res.json(rmtEnP);
  }catch(error){next(error);}

});
router.post('/Finalizar',
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await servicio.Finalizar(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
