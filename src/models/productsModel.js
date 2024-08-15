import mongoose from "mongoose"
import mongoosePaginte from "mongoose-paginate-v2"

const productsCollection = "products"

const productSchema = new mongoose.Schema({
    
    title: String,
    description: String,
    category: String,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnalis: String

})

productSchema.plugin(mongoosePaginte)

const productsModel = mongoose.model(productsCollection, productSchema)

export default productsModel

