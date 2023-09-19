import path from "path";
import { __dirname } from "../utils.js";
import { productsManager } from "./files/productManagerFiles.js";
import { cartManagerFiles } from "./files/cartManagerFiles.js";





export const productService = new productsManager (path.join(__dirname, "/files/products.json"));
export const cartService = new cartManagerFiles (path.join(__dirname, "/files/cart.json"));
