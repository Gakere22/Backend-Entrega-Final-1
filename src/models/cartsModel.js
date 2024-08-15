import mongoose, { Types } from "mongoose"

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({



            products: {
                type : [
                    {
                        product:{
                            type: mongoose.Schema.Types.ObjectId,
                            ref:"products",
                        },
                        quantity:{
                            type: Number,
                            default: 1
                        }
                    }
                        
                ],
                default:[]

            }  
      
  

})


const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel