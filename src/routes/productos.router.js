const express = require('express');
const router = express.Router();
const port = 3000;
//formato en el que se reciben peticiones: Json
//endpoints productos
//se le entrega productos de servidor a cliente

//se manda stock actual
router.get('/',(req,res)=>{
  const stock =[];
  res.json(stock);
});
// cliente busca producto por id
router.get('/:id',(req, res)=>{
  const { id } = req.params;
  res.json({
    id
  });
});
//cliente crea producto a lista productos
router.post('/',(req,res)=>{
const body = req.body;
// guardar producto en stock verificando que antes no exista
res.json({
  message: 'created',
  data: body
});
});
//cliente modifica producto en la lista stock verificando que antes exista
router.patch('/modifica/:id',(req,res)=>{
  //recibe el json del cliente
  const body = req.body;
  //modifica en lista de productos antes verificando que el producto existe
  (body[0])
  ? stock.push(body)
  : console.error('error 404');

});


module.exports = router;
