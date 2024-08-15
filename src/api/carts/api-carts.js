import express from 'express'
import cartsModel from '../../models/cartsModel.js'
import fs from 'fs'

import { ruta, getNextId, saveCartsOnFile,} from '../../gestion-archivos/carts.js'

import  {getDataFromFile} from '../../gestion-archivos/general.js'
import productsModel from '../../models/productsModel.js'





const routerCarts = express.Router() 



routerCarts.post("/carts/:cid/products/:pid",async(req,res)=>{
    const cId = req.params.cid;
    const id = req.params.pid
        
   try {
    const cart = await cartsModel.findById(cId)
    if(cart){
        const existe = await productsModel.findById(id)
       
        if(existe){
            console.log(" controlo stock")
            console.log(existe)
            let index = cart.products.findIndex( p =>  p.product.toString() === id)
            console.log(index)
            if(index != -1){
                cart.products[index].quantity++
                await cart.save()
                res.json({message: " se actualizo la cantidad del producto "})
            }else{
                let pro = { product: id, quantity: 1}
                cart.products.push(pro)
                await cart.save()
                res.json({message: " se agrego el producto"})
            }
            existe.stock --
           
           let result =  await productsModel.updateOne({_id : id},{$set: existe})
          
        }else{
            res.json({message: " el producto no existe"})
        }
        
    }else{
        res.json({message: " identificador de carrito no existe"})
    }
    


   } catch (error) {
            console.error(error)    
   }
    
})

routerCarts.get("/carts", async(req,res)=> {
    
    try {
        const carts = await cartsModel.find().populate('products.product')

        console.log (carts)
        res.json({message: "trae los carritos"})
         
    } catch (error) {
        console.error(error)
    }
   
})

//modifica la esctructura de datos del carrito
routerCarts.get("/carts/:cid", async (req,res)=>{
    const cId = req.params.cid
   
   try {
    const carrito = await cartsModel.findById(cId).populate('products.product')
    
    if (carrito){    
        console.log("muestro carrito con detalle de productos")
        console.log(JSON.stringify(carrito, null, '\t'))
      
        res.render("carrito", carrito)
        }else{
            res.json({message: "el id del carrito no exixte"})
        }
   } catch (error) {
        console.error(error)
   }
    
    
})

routerCarts.delete("/carts/:cid/products/:pid",  async  (req,res)=>{
    const id = req.params.pid
    const cid = req.params.cid
   

    try {
        const carrito = await cartsModel.findById(cid)
    
        if (carrito){
            
            const carritoActualizado = carrito.products.filter (p=> p.product.toString() !== id)
            carrito.products = carritoActualizado
    
            await carrito.save()
            const product = await productsModel.findById(id)
          
            product.stock++
         
            let result = await productsModel.updateOne({_id: id},{$set: product})
         
            res.json({message:"se elimino el produto de su carrito"})
        }
        
    } catch (error) {
        console.error(error)
    }
   


})

routerCarts.delete("/carts/:cid", async(req, res )=>{

    const cid = req.params.cid
    try {
        const carrito = await cartsModel.findById(cid)
  
    carrito.products = []
    await carrito.save()
  
    res.json({message: " carrito vacio"})

    } catch (error) {
        console.error(error)
    }
    
})


   
export default routerCarts