const express = require('express');
const routerApi = require('./src/routes/index');
const app = express();
const port = 8080;

app.use(express.json());

routerApi(app);

app.listen(port, ()=>{


  console.log("Mi port "+port);
});

// single responsibility principle: principio de una sola responsabilidad
//
