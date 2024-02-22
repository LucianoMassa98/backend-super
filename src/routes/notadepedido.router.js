
const express = require('express');
const router = express.Router();
const NotaPedidoService = require('../services/notasDePedidos.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getNotaDePedido,
  queryNotas,
  createNotaPedidoTotal
} = require('../schemas/notapedido.schema');


const servicio = new NotaPedidoService();

//cliente solicita lista de formularios: NTP
router.get('/',
validatorHandler(queryNotas,'query'),
async(req,res,next)=>{
  try{
    const notasdepedidos = await servicio.find(req.query);
  res.json(notasdepedidos);
  }catch(error){next(error);}

});


router.get('/:id',
validatorHandler(getNotaDePedido,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const ntp = await servicio.findOne(id);
  res.json(ntp);
  }catch(error){next(error);}
});



router.post('/CargaCompleta',
validatorHandler(createNotaPedidoTotal,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const ntp = await servicio.create(body);
  res.json(ntp);
  }catch(error){next(error);}

});

router.delete('/:id',
validatorHandler(getNotaDePedido,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const ntp = await servicio.delete(id);
  res.json(ntp);
  }catch(error){next(error);}
});

router.post('/alertas/prueba',
  async (req, res, next) => {
    try {
     const rta = await servicio.utlizarAxios();
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
