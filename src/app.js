import express  from "express";
import { productsRouter } from "./routes/productsRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js"


const port = 8080;

const app = express ();

app.use(express.json());

/*app.use(express.static(path.join(__dirname,"/public")))*/


app.listen(port,()=> console.log(`Servidor ejecutándose en el puerto ${port}`))

//Routes//
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
