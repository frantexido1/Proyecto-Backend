const express = require('express');
const router = express.Router();
const controllers = require("../controller/controller")
const middleware = require("../middleware/middleware")

//Crear Producto
router.post('/createProduct',[middleware.validator] ,controllers.newProduct)


//Ver Todos/Ver Unico Producto
router.get('/viewAllProduct', controllers.viewAllProduct)
router.get('/viewProduct/:id',[middleware.validatorID], controllers.viewProduct)
router.get('/searchProduct/:product',[middleware.validatorProduct] ,controllers.searchProduct)


//Modificar Producto
router.patch('/modifyProduct/:id',[middleware.validatorID],controllers.modifyProduct)


//Activar/Desactivar Producto
router.patch('/deleteProduct/:id',[middleware.validatorID], controllers.deleteProduct)
router.patch('/activateProduct/:id',[middleware.validatorID], controllers.activateProduct)
router.delete('/deletePermanentlyProduct/:id',[middleware.validatorID], controllers.deletePermanentlyProduct)

//Consulta Axios
router.get('/consultaAxios/:name',controllers.consultaAxios)



module.exports = router;