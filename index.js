const express = require('express');
const routerApi = require('./src/routes/index');
const app = express();
const port = 3010;


//formato en el que se reciben peticiones: Json
app.use(express.json());

routerApi(app);

app.listen(port, ()=>{


  console.log("Mi port "+port);
});
/*
parte 1: separado de responsabilidades (single responsibility principle)
    -importante definir una regla
    -definiendo las rutas (router)  archivo.router.js
parte 2: colocaar los endpoints por cada ruta: hicimos el CRUD
    -Get: cliente solicita que le envien informacion, mediante rutas,parametros y variables
    -Post: el metodo que se utiliza para leer req cliente y hacer creacion
    -Delete: metodo para borrar
    -Put: metodo para actualizar, actualizacion completa
    -Patch: metodo para actualizar, actualizacion parcial

parte 3: verificar el Status Code: revisar los errores en los endpoints
parte 4: definir servicios: en esta Etapa se utiliza logica de POO
   objetivo: agregar todas las logicas de programacion de las rutas creadas
   Ejemplos:
    Ruta de Productos "/routes/productos.router.js"
        - se crea una clase "productoservicio"
        - se le agregan los metodos: create,edit,find,findone,update,delete
        - definir funciones asincronas con los manejos de errores
parte 5: middlewere: software que permite la conectitividad con otros paqueres
        -middlewere para errores, error global
//*/
