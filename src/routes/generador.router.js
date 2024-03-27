const express = require('express');
const router = express.Router();
const GeneradorServicio = require('../services/generador.service');
const servicio = new GeneradorServicio();

router.get('/iniciar', async (req, res, next) => {
  try {
    const rta = await servicio.iniciar();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.delete('/notas', async (req, res, next) => {
  try {
    const rta = await servicio.delete();
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
