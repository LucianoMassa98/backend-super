const express = require('express');
const cors = require('cors');
const routerApi = require('./src/routes/index');

const {longError,errorHandler,boomErrorHandler,ormErrorHandler}=require('./src/middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3010;


//formato en el que se reciben peticiones: Json
app.use(express.json());

// estando vacio cualquiera puede conectarse
const whitelist = ['http://localhost:3010','https://tranquil-thicket-16476.herokuapp.com/'];
const options= {
  origin: (origin,callback)=>{
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(whitelist));
//---- definir middlewares tipo error
app.use(longError);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);
//----- escucha de peticiones en el port


const { getServerIPAddress } = require('./src/modules/obtenerIp');



app.listen(port, ()=>{
// Uso de la función para obtener la dirección IP del servidor
console.log('La dirección IP del servidor es:', getServerIPAddress());

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
parte 5: middlewere: software que permite la conectitividad con otros paquetes
        -son software que puede ir entre medio del req y la res, aunque tambien pueden
        encontrarse globalmente
        -USES CASES
          * funcionar como pipes o tuberias de paso, donde la salida de uno es la entrada de otro
          * validar datos
          * caputrar errores
          * validar permisos
          * controlar accesos

        ----  Formas de middlewares ------
        -> la mas comun
        function(req,res,next){
          if(sommething){
            res.send('end');
          }else{
            next();
          }
        }
        -> tipo error:

        function(error,req,res,next){
          if(error){
            res.status(500).json({error});
          }else{
            next();
          }
        }
        -> tipo error con boom:
            se definen despues de hacer el routing y se deben caputrar del routing de forma explicita
            para un mejor manejo, necesitamos la dependencia de "boom" npm i @hapi/boom
            es un servicio para el mejor manejo de los errores
            el error en servicio:
            throw boom.notfound();
                tipo de error -> statuscode -> mensaje
            debemos tener un middleware porque boom maneja un formato especial
            codigo src/middleares/error.handle/boomErrorHandle

        -> validar datos con joi:
        instalar dependencia npm i joi
        sirve para la validacion de datos, permite crear esquemas de datos, usando un lenguaje simple

parte 6: antes de pasar a produccion debemos verificar siertas cosas
        - cors: a quienes le damos accesos para que hagan solicitudes
        - https: nuestra api este en un servidor https
        - procesos de build:
        - remover logs:
        - seguridad (helmet): es muy importante, helmet una coleccio nde middlewares para proteccion
        - testing: probar la app

        CORS (cross-origin resource sharing)
        nuestro servicio tiene un defecto, que solo acepta peticiones del mismo dominio.

        instalar dependencia -> npm i cors
        llamamos nuestro cors en nuestro index principal

        DEPLOY DE LA APP
        - creamos cuenta en horoku
        - instalamos heroku  curl https://cli-assets.heroku.com/install.sh | sh
        - verificar version heroku --version
        - conectamos con nuestra cuenta creada con heroku logs
        - heroku create
        - crear archivo Procfile y poner dentro web: npm run start
        - agregar en package.json "engines": {  "node": "16.x" }
        - subimos el repositorio local a heroku con git push heroku master

parte 7: agregar persistencia de datos, utilizando docker para poder simular una base de datos en un entorno local

        - instalacion docker
        - agregar archivo docker-compose.yml
          indicar la version e ir agregando servicios a utilizar, como la base de datos
          y pgadmin un servicio que nos permite visualisar las tablas de manera grafica, auqnue tambien existe el manejo por terminal

        - agregar archivo Profile, sirve para ejecutar el npm run start





 */
