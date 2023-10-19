import { Router } from "express";
import { productService } from "../dao/index.js";


;
const router = Router ();


//http://localhost:8080/api/products
router.get('/', async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, category } = req.query;
      const query = {};
      const options = {
        limit,
        page,
        lean: true
      };
  
      
      if (limit < 1) throw new Error('El limite ingresado debe ser mayor a 1');
      if (page < 1) throw new Error('La página ingresada debe ser mayor a 1');
  
      if (sort === 'asc') {
        options.sort = { price: 1 };
      }
      if (sort === 'desc') {
        options.sort = { price: -1 };
      }
  
      if (category === 'Celulares' ||
        category === 'Tablets' ||
        category === 'Computers' ) {
        query.category = category;
      }
  
      const result = await productService.getProducts(query, options);
      const filteredProducts = result.docs.filter((prod) => prod.stock > 0);
  
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
      const dataProducts = {
        status: 'success',
        payload: filteredProducts,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes('page') ? baseUrl.replace(`&page=${result.page}`, `&page=${result.nextPage}`) : baseUrl.concat(`&page=${result.nextPage}`) : null
      };
      return res.json({ status: 'success', dataProducts });
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  });


router.get("/:pID",async (req,res)=> {
    try {
    const pID = req.params.pID
    const result = await productService.getProductsByID(pID)
    res.json({status:"sucess", data:result})
} catch (error) {
        res.json({status:"error",message:error.message})
}
})

router.post("/", async (req,res) => {
    try {
        const productInfo = req.body;
        const result = await productService.addProduct(productInfo);
        res.json({status:"sucess", data:result});
    } catch (error) {
        res.send(error.menssage);
    }
})

router.put("/:pID", async (req, res) => {
    try {
        const pID = req.params.pID;
        const updateProduct = req.body;
        const result = await productService.updateProduct(pID, updateProduct);
        res.send({status:"sucess", data:result});
    } catch (error) {
        res.send(error.menssage);
    }
})

router.delete("/:pID", async (req, res) => {
    try {
        const pID = req.params.pID;
        const result = await productService.deleteProduct(pID);
        res.send({status:"sucess", data:result});
    } catch (error) {
        res.send(error.menssage);
    }
})



export {router as productsRouter}