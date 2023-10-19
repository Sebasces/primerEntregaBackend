import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({

    products:{

        type: [

            {

                productId:{

                    type:mongoose.Schema.Types.ObjectId,

                    ref:"products"

                },

                quantity:{

                    type:Number,

                    required:true

                }

            }

        ],

        default:[]

    }

});
export const cartModel = new mongoose.model(cartCollection, cartSchema)