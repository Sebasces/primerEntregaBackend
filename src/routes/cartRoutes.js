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

export { router as cartRouter }