import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "products";

const productsSchema =  new mongoose.Schema({

    code:{
        type:Number,
        required:true,
        unique:true},
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }, 
	price:{
        type:Number,
        required:true
    },
	thumbnail:{
        type:String,
    },
    category:{
        type:String,
        required:true,
        enums:["Celulares","Tablets","Computers"],
        index: true
    },
    stock:{
        type:Number,
        required:true,

        status: {
            type: Boolean,
            default: true,
            required: true}
    }
    
})
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);