import { productsModel } from "./models/productsModel.js";

export class productManagerMongo {

    constructor (){
    this.model = productsModel;
    }

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
        const result = await this.model.findById(productpId)
        return result
        } catch (error) {
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
            throw new Error ("no se pudo actualizar el producto")
            
        }
        }

    /*async deleteProduct (pID) {
        try {
            
        } catch (error) {
            
        }
    }*/
    async getProducts(){
        try {
            const result = await this.model.find().lean();
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async getProductsPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            return result;
        } catch (error) {
            console.log("getProducts: ", error.message);
            throw new Error("Se produjo un error al crear el producto");
        }
    };

    async deleteProduct (productId) {
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
}