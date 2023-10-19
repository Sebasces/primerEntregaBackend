import express  from "express";
import { __dirname }from  "./utils.js";
import path from "path";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { productService } from "./dao/index.js";

import { productsRouter } from "./routes/productsRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { viewsRouter } from "./routes/viewsRoutes.js";

import { dbConnection } from "./config/dbConnection.js";

const port = process.env.PORT || 8080;
const app = express ();

app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")))
app.use(express.urlencoded({extended:true}));


const httpServer = app.listen(port,()=> console.log(`Servidor ejecutándose en el puerto ${port}`))

const io = new Server (httpServer);

dbConnection();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join (__dirname,'/views'));


//Routes//
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(viewsRouter);



io.on("connection", async (socket)=>{
    console.log("cliente conectado")
    const products = await productService.getProducts();
    socket.emit("productsArray", { products: products.docs});

socket.on("addProduct", async (product)=> {
    await productService.addProduct(product);
    const products = await productService.getProducts();
    io.emit("productsArray", products);
    });

socket.on("deleteProduct", async (pID) => { 
    await productService.deleteProduct(pID);
    const products = await productService.getProducts();
    io.emit("productsArray", products);
    });
    
});

