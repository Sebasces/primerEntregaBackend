/*import fs from "fs";


export class productsManager {
    constructor (path){
        this.filePath = path;
    }
        fileExist (){return fs.existsSync(this.filePath);
        
        }
    
    ; 
    async getProducts () {
        try {
            if (this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
                const products = JSON.parse (contenidoString);
                return products;
            }
         else {
            throw new Error ("no es posible obtener los productos")
        }
    }
        catch (error) {console.log (error.message);
            throw error;  
        }
    }

    async addProduct (product) {
                    try { 
                    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                    throw new Error("Todos los campos son obligatorios");

                    }
                    const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
                    const products = JSON.parse (contenidoString);
                    const codeExist = products.find((elem) => elem.code === product.code); 
                    if (codeExist) {
                        throw new Error("El codigo de producto ya existe.");
                    };
                    if (products.length==0){this.newId =1} 
                    else {this.newId=products[products.length-1].id+1
                    }       
            
                    const newProduct = {
                    id: this.newId, 
                    ...product,
                    }
                products.push(newProduct)
                await fs.promises.writeFile(this.filePath,JSON.stringify(products,null, "\t"));
                console.log("producto agregado")}
    
            
        catch (error) {
            console.log(error.message)
        }
    }
    async  getPrductsByID (productpId) {
        try {
            if (this.fileExist()){
                const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
                const products = JSON.parse (contenidoString);
                const identity = products.find((element)=>element.id === productpId)
                if(!identity) {console.log("el codigo no existe")} else {return (identity)}
            }else {
                throw new Error ("no es posible leer el archivo")
            }
        }
            catch (error) {console.log (error.message);
                throw error;  
            }
        
        }
async updateProduct (pID, product) {
    try {
        const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
        const products = JSON.parse (contenidoString)
        let productIndex = products.findIndex (prod=> prod.id == pID)
        if (productIndex === -1) {return console.log ("producto no encontrado")}
        if (product.id) {return console.log("No se puede modificar dato")}
        products[productIndex] = {...products[productIndex], ...product }
        const productsString = JSON.stringify(products, null, 2)
       await fs.promises.writeFile(this.filePath, productsString )
        console.log("producto modificado")
    } catch (error) {
        console.log("error",error.message)
    }
}

async deleteProduct (pID) {
    try {   
    if (this.fileExist()){
        const contenidoString = await fs.promises.readFile(this.filePath, "utf-8");
        const products = JSON.parse (contenidoString);
        const deleteItem = products.filter((element)=>element.id !== pID)
        products.push(deleteItem)
        await fs.promises.writeFile(this.filePath,JSON.stringify(deleteItem,null, "\t"));
        console.log("producto eliminado")}
    
    else {
        throw new Error ("no es posible leer el archivo")
    }
    }
    catch (error) {console.log (error.message);
        throw error;  
    }



    
}
}*/