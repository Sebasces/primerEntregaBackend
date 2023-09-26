import express  from "express";
import { __dirname }from  "./utils.js";
import path from "path";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { productService } from "./persistence/index.js";
import { productsRouter } from "./routes/productsRoutes.js";
import { cartRouter } from "./routes/cartRoutes.js";
import { viewsRouter } from "./routes/viewsRoutes.js";




const port = 8080;

const app = express ();

app.use(express.json());

app.use(express.static(path.join(__dirname,"/public")))




const httpServer = app.listen(port,()=> console.log(`Servidor ejecutándose en el puerto ${port}`))

const io = new Server (httpServer);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join (__dirname,'views'));


//Routes//
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use(viewsRouter);

io.on("connection", async (socket)=>{
    console.log("cliente conectado")
    const products = await productService.getProducts();
    socket.emit("productsArray", products)
    socket.on("addProduct", async(product)=>{
        const result = await productService.addProduct(product);
        const products = await productService.getProducts();
        io.emit("productsArray", products);
    });
});

