import { productsModel } from "./models/productsModel.js";

export class productManagerMongo {

    constructor (){
    this.model = productsModel;
    }


    
    async getProducts(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async addProduct (productInfo){
        try {
            const result = await this.model.create(productInfo)
            return result
        } catch (error) {
            throw new Error ("no se pudo agregar el producto") 
        }
    }

    async  getProductsByID (productpId){
        try {
        const result = await this.model.findById(productpId).lean();
        if (!result) {
            throw new Error("No se pudo encontrar el producto con el ID ingresado")
        }
        return result
        } catch (error) {
            console.log("getPtoductById", error.message);
            throw new Error ("no se pudo obtener el producto")
        }
    }
    async updateProduct (pID, product) {
        try {
            const result = await this.model.findByIdAndUpdate(pID, product, {new:true})
            if (!result) {
                throw new Error ("no se pudo encontrar el producto a actualizar")
            }
            return result
        } catch (error) {
            console.log("updateProduct", error.message)
            throw new Error ("no se pudo actualizar el producto")
        }
        }

        async deleteProduct(productId) {
            try {
                const result = await this.model.findByIdAndDelete(productId);
                if (!result) {
                    throw new Error("No se pudo encontrar el producto con el ID indicado");
                }
                return result;
            } catch (error) {
                console.log("deleteProduct", error.message);
                throw new Error("No se pudo eliminar el producto");
            }
        };


        /*async deleteProduct (productId) {
            try {   
                    const products = await this.getProducts();
                    console.log(products)
                    const productExist = products.find(elm=> elm._id == productId);
                    console.log(productExist)
                    if (productExist) {
                    const newProducts = products.filter(elm=> elm.products._id != productId);
                    
                    products = newProducts
                    console.log(newProducts)
                    const result = await this.model.findByIdAndUpdate( products, {new:true})
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
    */

/*async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };*/

    
}