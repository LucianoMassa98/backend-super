const express = require('express');
const router = express.Router();
const port = 3000;
const ProductoServicio = require('../services/producto.service');
const servicio = new ProductoServicio();


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de productos
router.get('/lista-productos',async (req,res)=>{
 const productos = await servicio.Buscar();
 res.json(productos);

});
// cliente busca producto por id
router.get('/BuscarPor/:id',async(req, res)=>{
  const { id } = req.params;
   const producto = await servicio.BuscarUno(id);
   res.json(producto);
});
//cliente pide de la nota de pedido {x} el producto {y}
router.get('/',(req,res)=>{
  const {limit , offset} = req.query;
  if(limit && offset){
    res.json(
      {
      limit,
      offset
    }
      );
  }else{
    res.send('no hay parametros');
  }
  //en limit o offset se vera la paginacion
//sirven para filtro
//debe ponerse este especifico antes que los routeer con parametros
//api.example.com/productos
//api.example.com/productos?page=1
//api.example.com/productos?limit=1&offset=2
//api.example.com/productos?region=USA
//api.example.com/productos?region=USA&brand=XY
});


  // --------------------- Endopoint post ----------------------
//cliente agrega un producto nuevo a la lista "productos"
router.post('/',async(req,res)=>{
  const body = req.body;
  const newproduct = await servicio.Crear(body);
  // guardar producto en stock verificando que antes no exista
  res.status(201).json(newproduct);
  });


// --------------------- Endopoints Put ----------------------
//cliente modifica el producto por completo mandando un id
router.put('/ModificarCompleto/:id ',async(req,res)=>{
    //recibe el json del cliente
    const {id} = req.params;
    const body = req.body;
    //modifica en lista de productos antes verificando que el producto existe
    (body[0])
    ? stock.push(body)
    : console.error('error 404');

  });

// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/ModificaParcial/:id',async(req,res)=>{
  try{
  const {id} = req.params;
  const body =  req.body;
  const producto = await servicio.Actualizar(id,body);
  res.json(producto);
  }catch(error){
    res.json({
      message: error.message
    });
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra producto de la lista por id
router.delete('/BorrarProducto/:id',async(req,res)=>{
  const {id} = req.params;
  const band = await servicio.Borrar(id);
  res.json(band);
});




/*
Exportando el Modulo
 */
module.exports = router;
