import fs from "fs";
import { productService } from "../index.js"; 

export class cartManagerFiles {

constructor (path){
    this.pathFile = path;
}

fileExist (){
    return fs.existsSync(this.pathFile)
}

async getCart () {
try {
    if (this.fileExist()){
        const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
        const cart = JSON.parse(contenidoString);
        return(cart)
    } else {
        throw new Error ("no se pudo encontrar el archivo")
    }
    
} catch (error) {
    throw error;
}

}

async createCart(){
    try {
        if(this.fileExist()){
            const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
            const cart = JSON.parse(contenidoString);
            if (cart.length==0){this.newId =1} 
                    else {this.newId=cart[cart.length-1].id+1}
            const newCart = {
                cartId: this.newId,
                products:[]
            };
            cart.push(newCart);
            await fs.promises.writeFile(this.pathFile,JSON.stringify(cart,null, '\t'));
            return newCart;
        } else {
            throw new Error("No se pudieron obtener los carritos");
        }
    } catch (error) {
        throw error;
    }
};

async getCartById(cartId) {
    try {
        const cart = await this.getCart(); 
        const cartFind = cart.find((elem) => elem.cartId === cartId);
        if (!cartFind) {
            console.log("No id indicado")
        }
        return (cartFind); 
    } catch (error) {
        console.error(error.message);
        throw error;
    }

}

async addproductToCart(cartID, productId) {
    try {
        if (this.fileExist ()){
        const contenidoString = await fs.promises.readFile(this.pathFile,"utf-8");
        const cart = JSON.parse(contenidoString)
        const carrito = cart.find((item)=> item.cartId === cartID);
        if(cart){
            const existProduct = carrito.products.find((product)=> product.id === productId);
            if (existProduct) {
                existProduct.quantity +=1;
            } 
            else {
                const newProduct ={
                    idProduct: productId,
                    quantity: 1,
                }
                carrito.products.push(newProduct)
                await fs.promises.writeFile(this.pathFile,JSON.stringify(carrito, null, '\t'))
                return "producto agregado"
            } 
        }
    }}
            catch (error) {
                console.log(error.message)
                throw error;
            }}
        


}


