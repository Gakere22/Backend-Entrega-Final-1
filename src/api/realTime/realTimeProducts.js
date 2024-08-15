import express from "express";
import {ruta} from "../../gestion-archivos/productos.js";
import { getNextId } from "../../gestion-archivos/productos.js";
import { updateProduct } from "../../gestion-archivos/productos.js";
import { getDataFromFile } from "../../gestion-archivos/general.js";
import { saveProductsOnFile } from "../../gestion-archivos/productos.js";
/*
saveProductsOnFile, 
updateProduct,
getNextId,
ruta,
createInitialBaseProducts,
*/
let io = null
const socketRealTimePro = (ioP)=> {
    
    io = ioP;
}

const routerRealTime = express.Router()


/*
routerRealTime.get("/realTimeProducts", (req,res)=>{
     
    let {limit} = req.query;
    const products = getDataFromFile(ruta)
    
    if(products.length !== 0){
        
        if(limit){
            limit = parseInt(limit)
            if(limit < products.length) {
                let productosFiltrados = products.slice(limit)
                res.json({...productosFiltrados})
            }else{
                res.json({message:" el parametro pasado como limiete supera la cantidad de productos exitentes"})
            }          
        }else{
            //let producto = [{nombre: "tomate", precio: 10}, {nombre: "pera", precio: 20}]
            res.render("realTimeProducts", {products})
        }
    }else{
        res.send({status:"error", message:"No hay productos "})
    }
    
})
*/

routerRealTime.get("/realTimeProducts", (req,res)=>{
     
    //const products = getDataFromFile(ruta)
    
            //let producto = [{nombre: "tomate", precio: 10}, {nombre: "pera", precio: 20}]
            let {id} = req.query
            console.log(id)
            if(id !== undefined){
                console.log("entro a eliminar")
                id = parseInt(id)
                let products = getDataFromFile(ruta)
                products =  products.filter((pro)=> pro.id !== id)
                saveProductsOnFile(products)
                const productos = getDataFromFile(ruta)
                io.emit("productosActualizados", productos)
            }else{
                res.render("realTimeProducts", "")
            }
})


routerRealTime.post("/realTimeProducts", (req,res)=>{
    console.log("entramos a dar de alta form real products")
    const data = req.body
    console.log(data)
    let product= {};
    let nextId = getNextId()
    if (data.title){
        if(data.description){
            if(data.code){
                if(data.price){
                    if(data.stock){
                        if(data.category){
                                product = {
                                id: nextId,
                                name: data.title,
                                description: data.description,
                                price: parseFloat(data.price),
                                status:  true, 
                                stock: parseInt(data.stock),
                                category: data.category,
                                thumbnalis:  null 
                            }   
                            updateProduct (product, ruta);
                            console.log ("dimos de alta realproduct form")
                            nextId++ 
                            const productos = getDataFromFile(ruta)
                            io.emit("productosActualizados", productos)
                               
                          //  res.send({status: "succes", mensaje:"Se dio de alta el producto"})
                        }else{
                            res.send({status: "error", mensaje:"El campo category es obligatorio"})
                        }
                    }else{
                        res.send({status: "error", mensaje:"El campo Stock es obligatorio"})
                    }    
                }else{
                    res.send({status: "error", mensaje:"El campo Price es obligatorio"})
                }
            }else{
                res.send({status: "error", mensaje:"El campo Code es obligatorio"})
            }
        }else{
            res.send({status: "error", mensaje:"El campo Description es obligatorio"})
        }

    }else{
        res.send({status: "error", mensaje:"El campo Name es obligatorio"})
    }

  
  
 

    
})







export {routerRealTime,
    socketRealTimePro
    }