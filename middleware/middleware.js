const { check, validationResult, body } = require("express-validator")
const { Product } = require("../models/products")

const middleware = {
    validator: [
        check("state", 'Estado es requerido').not().isEmpty(),
        check("product", 'Producto es requerido').not().isEmpty(),
        check("marca", 'Marca es requerido').not().isEmpty(),
        check("stock", 'Stock es requerido').not().isEmpty(),
        check("precio", 'Precio es requerido').not().isEmpty(),
    ],
    validatorID: async (req, res, next) => {
        try {
            const product = await Product.findById(req.params.id)
            if (product !== null) {
                next();
            } else {
                res.status(400).json({ msg: "El ID es invalido" })
            }
        } catch (error) {
            res.status(400).json({ msg: "El formato de ID es invalido" })
        }

    },
    validatorProduct: async (req, res, next) => {
        const product = await Product.findOne(req.params)
        if (product !== null) {
            next();
        } else {
            res.json({ msg: "El Producto es invalido" })
        }
    }
}

module.exports = middleware