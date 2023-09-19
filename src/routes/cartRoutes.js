import { Router } from "express";
import { cartService } from "../persistence/index.js";


const router = Router ();

//http://localhost:8080/api/cart
router.get("/", async (req,res) => {
try {
    const cart = await cartService.getCart()
    res.json({data:cart})

} catch (error) {

    res.json({error:error.message})
}

})

router.get("/:cId", async(req, res)=> {
    try {
        const cartId = parseInt(req.params.cId);
        const cart = await cartService.getCartById(cartId);
        res.json({data: cart})
    
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/", async(req, res)=> {
    try {
        const newCart = await cartService.createCart();
        res.json({message:"Carrito agregado", data: newCart});
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
})

router.post("/:cid/product/:pid", async (req, res)=> {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const productToCart = await cartService.addproductToCart(cartId, productId);
        res.json({message: "Agregando producto al carrito...", data: productToCart});   

    } catch (error) {
        res.json({status:"error",message:error.message});
    }
    })


export { router as cartRouter }