import { Router } from "express";
import { cartService, productService } from "../dao/index.js";


const router = Router ();

//http://localhost:8080/api/cart
router.get("/", async(req,res)=>{
    try {
        const carts = await cartService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});

router.get("/:cId", async(req, res)=> {
    try {
        const cartId = req.params.cId;
        const cart = await cartService.getCartById(cartId);
        res.json({status: "sucess", data: cart})
    
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/", async(req, res)=> {
    try {
        const newCart = await cartService.createCart();
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
        const result = await cartService.addproductToCart(cartId, productId);
        res.json({status:"sucess", message: "Agregando producto al carrito...", result});   

    } catch (error) {
        res.json({status:"error",message:error.message});
    }
    })

router.delete("/:cid/products/:pid", async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const cart = await cartService.getCartById(cartId);
            const result = await cartService.deleteProduct(cartId, productId);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    })

    router.put("/:cid/products/:pid", async(req,res)=>{
        try {
            const {cid:cartId,pid:productId} = req.params;
            const {newQuantity} = req.body;
            const cart = await cartService.getCartById(cartId);
            const result = await cartService.updateProductCart(cartId,productId,newQuantity);
            res.json({status:"success", result});
        } catch (error) {
            res.json({error:error.message});
        }
    });
export { router as cartRouter }