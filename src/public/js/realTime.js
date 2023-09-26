const socketClient = io();

const productList = document.getElementById("productList");
const addProductForm = document.getElementById("addProductForm")

addProductForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(addProductForm);
    const jsonData = {};
    for(const [key,value] of formData.entries()){
        jsonData[key]=value
    };
    jsonData.price = parseInt(jsonData.price);
    jsonData.code = parseInt(jsonData.code);
    jsonData.stock = parseInt(jsonData.stock)
    
    socketClient.emit("addProduct",jsonData);
    addProductForm.reset();
});

socketClient.on("productsArray", (dataProducts)=>{
    console.log(dataProducts);
    let productsElms="";
    dataProducts.forEach(product=>{
        productsElms +=
        `<li>
            <p>Nombre: ${product.title}</p><button onclick="deleteProduct(${product.id})">Eliminar</button>
        </li>`
    });
    productList.innerHTML=productsElms;
});

let deleteProduct = (productId) =>{
    socketClient.emit("deleteProduct", productId)
}