
import express from 'express'
import {saveProductsOnFile, updateProduct, getNextId, ruta  } from '../../gestion-archivos/productos.js'
import {getDataFromFile} from '../../gestion-archivos/general.js'
import productsModel from '../../models/productsModel.js'
import cartsModel from '../../models/cartsModel.js'



const routerProducts = express.Router()





routerProducts.put ("/products/:pid", async (req,res)=>{
    const id = req.params.pid
    const data = req.body
   
    try {
        let existe = await productsModel.findById(id)
        
        if (existe != null){

            let result = await productsModel.updateOne({_id: id},{$set: data})
            console.log (result)
        res.json({message: "se actualizo el producto"})
        }else{
            res.json({message: "El producto no existe"})
        }
    } catch (error) {
        console.error(error)
    }                             
    
})



/*
routerProducts.get("/products", (req,res)=>{
     
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
            res.json({...products})
        }
    }else{
        res.send({status:"error", message:"No hay productos "})
    }
    
})
   
*/

/*
routerProducts.get("/products", (req,res)=>{
     
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

routerProducts.get("/products", async (req,res)=>{
     
        const {sort, limit = 3, page = 1, query} = req.query;

        console.log("muestro valor de query")
        console.log(query)
        let filtro = {}
        if(query){
            let valor = query.split(":")
           // valor[0] = valor[0].toLowerCase()
            //valor[1] = valor[1].toLowerCase()
           
            if (valor[0] === 'category'){    
                filtro.category = valor[1]
            }
            if (valor[0] === 'status'){    
                filtro.status = valor[1]
            }
           
        }
        
        let orden = {sort:{}}   
        
        if (sort !== ''){
            if(sort === 'asc'){
                orden.sort= {price: 1} 
            }else{
                orden.sort= {price: -1}
            }
        }
       
        try {
                                                            
            let result = await productsModel.paginate( filtro, { page, limit, orden, lean: true })
            
            result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null;
            result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null;
            result.isValid = !(page <= 0 || page > result.totalPages)
            console.log("estoy mandado los productos")
            console.log(result)
            res.render("home", result)

        } catch (error) {

        }

    
})




routerProducts.get("/products/:pid", async (req,res)=>{
    let id = req.params.pid
    try {
        let result = await productsModel.findById(id).lean()
        console.log(result)
        
         res.render("detalleProducto", {result})  
        
    } catch (error) {
        console.error(error)
    }
   
})




routerProducts.post("/products", async (req,res)=>{
            
            const data = req.body
            console.log("mostrar la data")
            console.log(data)
            console.log(data.title)
           try {
            let product= {};
            if (data.title){
                if(data.description){
                    if(data.price){
                        if(data.status){
                            if(data.stock){
                                if(data.category){
                                        product = {
                                        name: data.title,
                                        description: data.description,
                                        price: parseFloat(data.price),
                                        status: data.status === "false"? false: true, 
                                        stock: parseInt(data.stock),
                                        category: data.category,
                                        thumbnalis:  Boolean(data.thumbnalis)? data.thumbnalis : null 
                                    }
                                    const result = await productsModel.collection.insertOne(product)
                                        
                                    res.send({status: "succes", mensaje:"Se dio de alta el producto"})

                                }else{
                                    res.send({status: "error", mensaje:"El campo category es obligatorio"})
                                }
                            }else{
                                res.send({status: "error", mensaje:"El campo Stock es obligatorio"})
                            }
                        }else{
                            res.send({status: "error", mensaje:"El campo Status es obligatorio"})
                        }
                    }else{
                        res.send({status: "error", mensaje:"El campo Price es obligatorio"})
                    }            
                }else{
                    res.send({status: "error", mensaje:"El campo Description es obligatorio"})
                }
            }else{
                res.send({status: "error", mensaje:"El campo Title es obligatorio"})
            }
           } catch (error) {
            console.error(error)
           }
           
               
})



//borrado logico se cambia es estado de status
routerProducts.delete("/products/:pid",async (req,res)=>{

    let id = req.params.pid
    try {
        let result = await productsModel.updateOne({_id: id},{$set: {status: false}})
    
        result = await productsModel.find().lean()
        console.log (result.length)
        
        
        res.json({ message:" se borro producto"})
    } catch (error) {
        console.error(error)
    }
   
})



export default routerProducts
