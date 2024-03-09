const express = require('express');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const router = express.Router();
/*const CajaServicio = require('../services/caja.service');
const servicio = new CajaServicio();
const { } = require('../schemas/descarga.schema');
*/

const validatorHandler = require('../middlewares/validator.handler');
const directorioParaDescargar = './App/Debug';

router.get('/app',async (req,res,next)=>{

 try{

 // Verifica si la carpeta existe
 fs.stat(directorioParaDescargar, (err, stats) => {
  if (err || !stats.isDirectory()) {
    res.status(404).send('La carpeta no existe');
    return;
  }

  // Crea un archivo zip temporal
  const zipFilePath = path.join(__dirname, 'carpeta.zip');
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // nivel máximo de compresión
  });

  output.on('close', () => {
    // Envía el archivo zip como respuesta
    res.download(zipFilePath, 'carpeta.zip', (err) => {
      if (err) {
        console.error('Error al enviar el archivo zip:', err);
        res.status(500).send('Error interno del servidor');
      }

      // Elimina el archivo zip después de la descarga
      fs.unlink(zipFilePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo zip:', err);
        }
      });
    });
  });

  archive.on('error', (err) => {
    console.error('Error al comprimir la carpeta:', err);
    res.status(500).send('Error interno del servidor');
  });

  archive.pipe(output);
  archive.directory(directorioParaDescargar, false);
  archive.finalize();
});
 }catch(error){next(error);}


 });


module.exports = router;
