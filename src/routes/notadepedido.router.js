
const express = require('express');
const router = express.Router();
const NotaPedidoService = require('../services/notasDePedidos.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createNotaPedido,
  getNotaDePedido,
  addItemSchema,
  subItemSchema
} = require('../schemas/notapedido.schema');


const servicio = new NotaPedidoService();

//cliente solicita lista de formularios: NTP
router.get('/',async(req,res,next)=>{
  try{
    const notasdepedidos = await servicio.find();
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

router.post('/',
validatorHandler(createNotaPedido,'body'),
async (req,res,next)=>{
  try{
  const body = req.body;
  const ntp = await servicio.create(body);
  res.json(ntp);
  }catch(error){next(error);}

});
router.post('/addItem',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await servicio.addItem(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/subItem',
  validatorHandler(subItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await servicio.subItem(body);
      res.json(newItem);
    } catch (error) {
      next(error);
    }
  }
);


router.delete('/:id',
validatorHandler(getNotaDePedido,'params'),
async(req,res,next)=>{
  try{
    const { id } = req.params;
  const ntp = await servicio.delete(id);
  res.json(ntp);
  }catch(error){next(error);}
});

module.exports = router;
