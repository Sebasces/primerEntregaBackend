import mongoose from "mongoose";

export const dbConnection = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://sebascescosta:racing2023@cluster0.kf4udwo.mongodb.net/ecommerceDB?retryWrites=true&w=majority`)
        console.log("base de datos conectada")
    } catch (error) {
        console.log(`hubo un error de conexion: ${error.message}`)
    }

}