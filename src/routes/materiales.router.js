const express = require('express');
const router = express.Router();
const MaterialService = require('../services//materiales.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createMaterialSchema, updateMaterialSchema, getMaterialSchema} = require('../schemas/material.schema');

const servicio = new MaterialService();


// ------------------- EndPoint Get ------------------------
//cliente solicita lista de Materials
router.get('/Lista',async (req,res,next)=>{

  try{

    const materiales = await servicio.Buscar();
    res.json(materiales);
  }catch(error){ next(error);}

 });
// cliente busca Material por id
router.get('/BuscarPorID/:id',
validatorHandler(getMaterialSchema,'params'),
async(req, res,next)=>{
  try{
    const { id } = req.params;
   const material = await servicio.BuscarporID(id);
   res.json(material);
  }catch(error){ next(error);}

});

  // --------------------- Endopoint post ----------------------
//cliente agrega un Material nuevo a la lista "Materials"
router.post('/Crear',
validatorHandler(createMaterialSchema,'body'),
async(req,res,next)=>{
  try{
    const body = req.body;
  const newmaterial = await servicio.Crear(body);
  res.status(201).json(newmaterial);
  }catch(error){next(error);}

  });




// --------------------- Endopoints Patch ----------------------
//cliente actualizacion parcial
router.patch('/ModificaParcial/:id',
validatorHandler(getMaterialSchema,'params'),
validatorHandler(updateMaterialSchema,'body'),
async(req,res,next)=>{

  try{
  const {id} = req.params;
  const body =  req.body;
  const material = await servicio.Actualizar(id,body);
  res.json(material);
  }catch(error){
   next(error);
  }
});

// --------------------- Endopoints Delete ----------------------
//cliente borra Material de la lista por id
router.delete('/BorrarMaterial/:id',
validatorHandler(getMaterialSchema,'params'),
async(req,res,next)=>{
  try{
    const {id} = req.params;
  const band = await servicio.Borrar(id);
  res.json(band);
  }catch(error){next(error);}

});


/*
Exportando el Modulo
 */
module.exports = router;

