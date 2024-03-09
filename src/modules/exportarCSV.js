const fs = require('fs');
const csv = require('csv-parser');

function leerCSV(archivoCSV, callback) {
  const resultados = [];

  fs.createReadStream(archivoCSV)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      resultados.push(row);
    })
    .on('end', () => {
      callback(null, resultados);
    })
    .on('error', (error) => {
      callback(error, null);
    });
}


module.exports = { leerCSV };
