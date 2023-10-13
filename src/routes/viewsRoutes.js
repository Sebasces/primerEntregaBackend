import { Router } from "express";
import { productService } from "../dao/index.js";


const router = Router ();

router.get("/", async(req,res)=>{
    const {limit=3,page=1} = req.query;
    const query = {
    };
    const options = {
        limit,
        page,
        sort:{price:1},
        lean:true
    };
    const result = await productService.getProductsPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: result.docs,
        totalPages: result.totalPages,
        hasPrevPage:result.hasPrevPage,
        hasNextPage:result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes("page") ?baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
    }
    console.log(dataProducts)
    res.render("home", dataProducts);
})


/*router.get("/", async(req, res)=> {
    const data = await productService.getProducts();
    res.render("home", {products: data})

})*/

router.get("/realtimeproducts", (req, res)=> {
    res.render("realTime")
})



export { router as viewsRouter}