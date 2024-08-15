import express from 'express'
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import fs from 'fs'
import routerCarts from "./api/carts/api-carts.js"
import routerProducts from './api/products/api-products.js'
import { routerRealTime } from './api/realTime/realTimeProducts.js'
import { Server } from 'socket.io'
import {createInitialBaseCarts} from './gestion-archivos/carts.js'
import{createInitialBaseProducts} from './gestion-archivos/productos.js'
import { Socket } from 'socket.io'
//import socketProductsServer from './listeners/socketProductsServer.js'
//import { socketRealTimePro } from './api/realTime/realTimeProducts.js'
import mongoose from "mongoose"
import productsModel from "./models/productsModel.js"
import cartsModel from "./models/cartsModel.js"






/*
createInitialBaseProducts()

createInitialBaseCarts()
*/


const app = express();
app.use(express.json()) // esta linea es para poder enviar inpormacion en el body de la request
app.use(express.urlencoded({extended: true}))  // esta linea es para que la aplicacion entienda los parametros que viajan por la url



app.engine('handlebars', handlebars.engine());
app.set('views',__dirname +'/views');
app.set('view engine', 'handlebars');

app.use(express.static(__dirname +'/public'))

mongoose.connect("mongodb+srv://nahuelvarasnv:nahuelvaras@cluster0.q7m0ifi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

 .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectar con la base de datos", error)
    })


  

const PORT = 8080;



app.use("/", routerProducts);
app.use("/", routerCarts);
app.use("/", routerRealTime);



const httpServer = app.listen(PORT, ()=>(console.log("levanto el servidor")))




/*
const io = new Server(httpServer)


socketProductsServer(io)
socketRealTimePro(io)

*/



