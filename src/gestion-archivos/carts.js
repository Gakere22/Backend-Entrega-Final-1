import fs from 'fs'

  
//const data = require("./general")








const ruta ='carts.json'

 
    function  getNextId(){  //ruta
        const  carts = data.getDataFromFile(ruta)   
        console.log("etoy en id")
        console.log(carts)
        let max = 0
        if (carts.length !== 0){
        console.log("estoy en get id carts ")
            
            for(i=0; i < carts.length;i++){
                if(carts[i].id > max){
                    max = carts[i].id
                }        
            }
        max++
           
        }            
        return  max
    }
/*             
function upDateInicial (){

}
*/

const obj = {
    id: 1,
    products: []
}
const arreglo = [obj]

async function createInitialBaseCarts ()  {
    const datosJson = JSON.stringify(arreglo)
   
    if (!fs.existsSync(ruta)){
        fs.writeFileSync(ruta, datosJson,null,2)
               
    }else{
        console.log("el archivo CARTS tiene contenido")
    }

}

function saveCartsOnFile(carts){//ruta
    try {
       fs.writeFileSync(ruta, JSON.stringify(carts),null, 2)
       console.log("se guardo el archivoPRODUCTOS")
   } catch (error) {
       
   }

}




export  {
    ruta,
    createInitialBaseCarts,
    getNextId,
    saveCartsOnFile,
}
    