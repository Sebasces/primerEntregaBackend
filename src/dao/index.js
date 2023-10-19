/*import path from "path";*/
import { __dirname } from "../utils.js";
/*import { productsManager } from "./files/productManagerFiles.js";
import { cartManagerFiles } from "./files/cartManagerFiles.js";*/
import { productManagerMongo } from "./mongo/productManagerMongo.js";
import { cartManagerMongo } from "./mongo/cartManagerMongo.js";



//export const productManager = new ProductManager(path.join(__dirname, "/dao/fileSystem/data/products.json"));
//export const cartManager = new CartManager(path.join(__dirname, "/dao/fileSystem/data/carts.json"));



export const productService = new productManagerMongo ();
export const cartService = new cartManagerMongo ();
