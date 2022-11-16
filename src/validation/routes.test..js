const { param, body } = require("express-validator")

const validatorRoutes = {

    //Validaciones de la categoria

    idCategoriaValidator: [
        param("idCategoria").isInt().withMessage("El id de la categoria debe ser un entero").notEmpty()
    ],
    nameCategoriaValidator: [
        param("data").isString().withMessage("El nombre de la categoria debe ser un texto").notEmpty()
    ],

    bodyCategoriaValidator: [
        body("CategoriaName").isString().withMessage("El nombre de la categoria debe ser un texto").notEmpty().withMessage("El nombre de la categoria no puede estar vacio").isLength({max: 100}).withMessage("El nombre de la categoria no puede tener mas de 100 caracteres")
    ],

    //Validaciones del producto

    idProductoValidator: [
        param("IdProduct").isInt().withMessage("El id del producto debe ser un entero").notEmpty()
    ],

    nameProductoValidator: [
        param("NameProduct").isString().withMessage("El nombre del producto debe ser un texto").notEmpty()
    ],

    bodyProductoValidator: [
        //body("NombreProducto").isString().withMessage("El nombre del producto debe ser un texto").notEmpty().withMessage("El nombre del producto no puede estar vacio").isLength({max: 100}).withMessage("El nombre de producto no puede tener mas de 100 caracteres"),

        //body("Precio").isNumeric().withMessage("El precio del producto debe ser un valor numérico").notEmpty().withMessage("El precio del producto no puede estar vacio"),

        //body("Stock").isInt().withMessage("El stock del producto debe ser un valor entero").notEmpty().withMessage("El stock del producto no puede estar vacio"),

        //body("Fecha_Entrada").notEmpty().withMessage("La fecha del producto no puede estar vacia").isDate().withMessage("El valor ingresado debe ser una fecha"),

        /*body("Estado").notEmpty().withMessage("El estado de producto no puede estar vacio").custom((value, {req}) => {
            if (value.trim() !== "DISPONIBLE" && value.trim() !== "NO DISPONIBLE"){
                throw new Error("Los estados solo pueden ser DISPONIBLE y NO DISPONIBLE")
            }
            return true;
        }),*/

        //body("IdCategoria").isInt().withMessage("El id de la categoria debe ser un entero").notEmpty().withMessage("El id de la categoria no puede estar vacio")
    ],

    //Validación del Detalle Pedido Producto

    idDetPedProValidator: [
        param("idDetPedPro").notEmpty().withMessage("El id del detalle pedido producto no puede estar vacio").isInt().withMessage("El id del detalle pedido producto debe ser un entero")
    ],

    bodyDetPedProValidator: [
        body("IdPedido").notEmpty().withMessage("El id del pedido no puede estar vacio").isInt().withMessage("El id del pedido debe ser un entero"),

        body("IdProducto").notEmpty().withMessage("El id del producto no puede estar vacio").isInt().withMessage("El id del producto debe ser un entero")
    ]
}

module.exports = validatorRoutes;