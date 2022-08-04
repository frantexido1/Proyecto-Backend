const { Product } = require("../models/products");
const { check, validationResult, body } = require("express-validator");
const { default: axios } = require("axios");


const controllers = {
    myIndex(req, res) {
        res.render('index', { title: 'Express' })
    },

    //Crear Producto
    newProduct: async (req, res) => {
        try {
            const error = validationResult(req)
            if (error.isEmpty()) {
                const product = new Product(req.body);
                await product.save();
                res.status(201).json(product);
            } else {
                res.status(501).json(error)
            }

        } catch (err) {
            res.status(501).json({
                msg: "No se puede guardar el usuario en la DB, ese mail ya existe",
                err,
            })
        }
    },

    //Ver Todos/Ver Unico/Buscar Producto
    viewAllProduct: async (req, res) => {

        const products = await Product.find({ state: true });
        res.json({ products })

    },

    viewProduct: async (req, res) => {
        const product = await Product.findById(req.params.id)
        res.json({ product })
    },

    searchProduct: async (req, res) => {
        const products = await Product.find(req.params)
        res.json({ products })
    },

    //Modificar Producto
    modifyProduct: async (req, res) => {
        const { id } = req.params
        const body = req.body
        const product = await Product.findByIdAndUpdate(id, body);
        res.json(product)
    },

    //Activar/Desactivar Producto
    deleteProduct: async (req, res) => {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, { state: false });
        res.json(product)
    },

    activateProduct: async (req, res) => {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, { state: true });
        res.json(product)
    },

    deletePermanentlyProduct: async (req, res) => {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id);
        res.json(product)
    },

    //Consulta Axios API
    consultaAxios: async (req, res) => {
        try {
            const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/" + req.params.name)
            res.json({status:respuesta.status,data:respuesta.data})
        } catch (error) {
            res.json({status:error.response.status,data:error.response.data})
        }

    }

}

module.exports = controllers