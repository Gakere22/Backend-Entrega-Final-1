
import fs from 'fs'

    
/*
async function createInitialBase (ruta, arreglo)  {
    const datosJson = JSON.stringify(arreglo)
    
    if (!fs.existsSync(ruta)){
        fs.writeFileSync(ruta, datosJson,null,2)
        console.log("inicializo el arcivo") // sacar
        
    }else{
        console.log("el archivo tiene contenido")
    }

}
*/


 

 const getDataFromFile = (ruta)=>{
    try { 
        
       const data = fs.readFileSync(ruta ,"utf8")
       console.log(data)
       const dataParseada = JSON.parse(data)
       return dataParseada
    } catch (error) {
        console.error(error)
    }

} 

export  {getDataFromFile}

