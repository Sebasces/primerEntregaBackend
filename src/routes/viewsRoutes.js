import { Router } from "express";
import { productService } from "../dao/index.js";


const router = Router ();

router.get('/', async (req, res) => {
    try {
      res.render('home');
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  });
  
  
  router.get('/products', async (req, res) => {
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
        category === 'Computers') {
        query.category = category;
      }
  
      const result = await productService.getProducts(query, options);
  
      const baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
      const filteredProducts = result.docs.filter((prod) => prod.stock > 0);
  
      const dataProducts = {
        status: 'success',
        payload: filteredProducts,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes('page') ? baseUrl.replace(`&page=${result.page}`, `&page=${result.nextPage}`) : baseUrl.concat(`&page=${result.nextPage}`) : null
      };
      res.render('products', dataProducts)
      console.log(dataProducts);
    } catch (error) {
      res.json({ status: 'error', message: error.message });
    }
  })


router.get("/realtimeproducts", (req, res)=> {
    res.render("realTime")
})



export { router as viewsRouter}