

import { updateProduct } from "../../gestion-archivos/productos";



const socket = io();

socket.emit("dameProductos", "Dame productos");


let productosReferenciados = []
let idPro = "null"
let nombre = "null"
let descripcion = "null"
let precio = "null"
let categoria = "null"
let status = "null"
let stock = "null"
let imagen = "null"
        

socket.on("vaProductos", (productos) =>{
    const productosActualizados = document.getElementById('productosActualizados');

    const productoMap = productos.map( producto =>{
        let idPro = producto.id
        let nombre = producto.name
        let descripcion = producto.descripcion
        let precio = producto.price
        let categoria = producto.category
        let status = producto.status
        let stock = producto.stock
        let imagen = producto.thumbnalis
        
        return  `<div id=${idPro} class="productoDetalle"> id:${idPro} <br> nombre: ${nombre} <br> descripcion: ${descripcion} <br> precio: ${precio} <br> stock: ${stock} <br>  imagen:${imagen} <br></div>`
    })
    console.log("va producto")
    productosActualizados.innerHTML = productoMap;

    

})
