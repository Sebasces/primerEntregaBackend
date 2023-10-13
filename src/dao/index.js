/*import path from "path";*/
import { __dirname } from "../utils.js";
/*import { productsManager } from "./files/productManagerFiles.js";
import { cartManagerFiles } from "./files/cartManagerFiles.js";*/
import { productManagerMongo } from "./mongo/productManagerMongo.js";
import { cartManagerMongo } from "./mongo/cartManagerMongo.js";





export const productService = new productManagerMongo ();
export const cartService = new cartManagerMongo ();
