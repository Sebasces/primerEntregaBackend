import { Router } from "express";
import { cartService, productService } from "../dao/index.js";


const router = Router ();

//http://localhost:8080/api/cart
router.get("/", async(req,res)=>{
    try {
        const result = await cartService.getCarts();
        res.json({ status: "sucess", data:result});
    } catch (error) {
        res.json({ status: "error" , message: error.message});
    }
});

router.get("/:cId", async(req, res)=> {
    try {
        const cId = req.params.cId;
        const result = await cartService.getCartById(cId);
        res.json({status: "sucess", data: result})
    
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/", async(req, res)=> {
    try {
        const cart = req.body
        const newCart = await cartService.createCart(cart);
        res.json({status: "succes", message:"Carrito agregado", data: newCart});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.put("/:cid/product/:pid", async (req, res)=> {
    try {
        const {cid:cartId,pid:productId} = req.params;
        const cart = await cartService.getCartById(cartId)
        //const product = await productService.getProductsByID(productId)
        const result = await cartService.addproductToCart(cart, productId);
        res.json({status:"sucess", message: "Agregando producto al carrito...", data: result});   

    } catch (error) {
        res.json({status:"error",message:error.message});
    }
    })

router.delete("/:cId/products/:pId", async(req,res)=>{
        try {
            const {cId:cartId,pId:productId} = req.params;
            const cart = await cartService.getCartById(cartId);
            const result = await cartService.deleteProduct(cart, productId);
            res.json({status:"success", data: result});
        } catch (error) {
            res.json({ status: "error", message: error.message});
        }
    })

    
export { router as cartRouter }