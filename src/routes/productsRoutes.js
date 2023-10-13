import { Router } from "express";
import { productService } from "../dao/index.js";


;
const router = Router ();


//http://localhost:8080/api/products
router.get("/", async(req,res) => {
        try {
            const result =  await productService.getProducts();
            res.json({status:"sucess", data:result})
            console.log(result)
            /*const limit = parseInt(req.query.limit);
            if (limit) {
                const productsLimit = products.slice(0, limit);
                res.send(productsLimit);
            } else {
                res.send(products);
            }*/
    
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    
    })


router.get("/:pID",async (req,res)=> {
    try {
    const productpID = parseInt(req.params.pID)
    const result = await productService.getProductsByID(productpID)
    res.json({status:"sucess", data:result})
} catch (error) {
        res.json({status:"error",message:error.message})
}
})

router.post("/", async (req,res) => {
    try {
        const productInfo = req.body;
        const newProduct = await productService.addProduct(productInfo);
        res.send(newProduct);
    } catch (error) {
        res.send(error.menssage);
    }
})

router.put("/:pID", async (req, res) => {
    try {
        const pID = parseInt(req.params.pID);
        const product = req.body;
        await productService.updateProduct(pID, product);
        res.send("Endpoint para modificar productos");
    } catch (error) {
        res.send(error.menssage);
    }
})

router.delete("/:pID", async (req, res) => {
    try {
        const pID = parseInt(req.params.pID);
        await productService.deleteProduct(pID);
        res.send("Endpoint para eliminar productos");
    } catch (error) {
        res.send(error.menssage);
    }
})



export {router as productsRouter}