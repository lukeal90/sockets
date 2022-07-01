const {ProductService} = require('../services');

class ProductController {

    static async getAll(req, res) {
        try {
            let productos = await ProductService.getAll();
            return productos;
        } catch (error) {
            return [];
        }
    }

    static async productRandom(req, res) {
        try {
            let productos = await ProductService.getAll();

            if (productos.length == 0) {
                return res.status(403).send({"msg" : "No hay productos"});
            }  
            
            const random = Math.floor(Math.random()*productos.length);
            res.send(productos[random]);              
        } catch (error) {
            console.log("Algo salio mal al obtener un producto random : " + error.message);
        }
    }    

    static async getById(req, res) {
        try {
            let response = await ProductService.getById(req.params.id);
            res.send(response);
        } catch (error) {
            console.log("Algo salio mal al obtener los productos : " + error.message);
        }
    }

    static async addProduct(data) {
        try {
            let response = await ProductService.addProduct(data);
        } catch (error) {
            console.log("Algo salio mal al obtener los productos : " + error.message);
        }
    }
    
    static async updateProduct(req, res) {
        try {
            let response = await ProductService.updateProduct(req.body, req.params.id);
            res.send(response);
        } catch (error) {
            console.log("Algo salio mal al obtener los productos : " + error.message);
        }
    }
    
    static async deleteProduct(req, res) {
        try {
            let response = await ProductService.deleteProduct(req.params.id);
            res.send(response);
        } catch (error) {
            console.log("Algo salio mal al obtener los productos : " + error.message);
        }
    }    
}

module.exports = ProductController;