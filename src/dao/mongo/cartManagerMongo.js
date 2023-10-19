import { cartModel } from "./models/cartModel.js";

export class cartManagerMongo{
    constructor(){
        this.model = cartModel;
    };

    async getCarts() {
        try {
            const result = await this.model.find().lean().populate("products.productId");
            return result;
        } catch (error) {
            console.log("getCarts", error.message);
            throw new Error("No se pudo obtener el listado de carritos")
        }
    };

    async getCartById(cartId) {
        try {
            const result = await this.model.findById(cartId).populate("products.productId")
            if (!result) {
                throw new Error ("el carrito  con el ID: '${cartId}' no existe")
            }
            return result; 
        } catch (error) {
            console.error(error.message);
            throw new Error ("no se pudo obtener el carrito");
        }
    }

    async createCart () {
        try {
            const newCart = {}
            const result = await this.model.create(newCart)
            return result; 
        } catch (error) {
            console.error(error.message);
            throw new Error ("no se pudo crear el carrito");
        }
    
    }
        
        async addproductToCart(cartID, productId) {
            try {
                const cart = await this.getCartById(cartID)
                const productFind = await productService.getPtoductById(productId)
                const productExist = cart.products.find(elm=> elm.productId == productFind._id);
                if (productExist) {
                    productExist.quantity +=1;}
                    else {
                const newProductCart = {
                    productId: productId,
                    quantity: 1,
                }
                cart.products.push(newProductCart);}
                const result = await this.model.findByIdAndUpdate(cartID, cart, {new:true})
                return result;
                
            }
            catch (error) {
                console.log("addProductToCart", error.message);
                throw new Error("No se se puede agregar el producto al carrito");
                    }}
                
            async deleteProductCart(cartId,productId){
                try{
                const cart = await this.getCartById(cartId)
                const productExist = cart.products.find(elm=> elm.productId._id == productId);
                if (productExist) {
                const newProducts = cart.products.filter(elm=> elm.productId._id != productId);
                cart.products = newProducts
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true})
                return result;
                }
                else{
                    throw new Error("el producto no pudo ser eliminado")
                }
            }
            catch (error){
                console.log (error.message)
            }
            }
            
            async updateProductCart (cartId,productId, newQuantity){
                try{
                const cart = await this.getCartById(cartId)
                const productIndex = cart.products.findIndex(elm=> elm.productId._id == productId);
                if (productIndex >=0) {
                    cart.products[productIndex]={
                        ...cart.products[productIndex].quantity = newQuantity
                    }
                    const result = await this.model.findByIdAndUpdate(cartId, cart,{new:true})
                    return result;

                }}
                    catch (error){
                        console.log (error.message)
                }
            }

}
