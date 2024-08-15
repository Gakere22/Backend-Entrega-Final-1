/*
import {getDataFromFile} from "../gestion-archivos/general.js"
import {ruta} from "../gestion-archivos/productos.js"



const socketProductsServer = (io)=>{

    io.on('connection', socket=>{
    
        console.log("Nuevo Cliente conectado: " + socket.id)
        /*
        socket.on("disconnect", ()=>{
            console.log("se deconecto usuario:  "+ socket.id)
        })
        */
       /*
        socket.on("dameProductos", (data)=>{
            console.log (data)
            const prod = getDataFromFile(ruta)
            console.log("productos en socket")
            io.emit("vaProductos", prod )
        })
            */
        /*
        socket.on("productoEliminar", async (idPro)=>{


            io.emit("productsActual",await getDataFromFile() )
        })
        
      
    })
  
} 



export default socketProductsServer
*/