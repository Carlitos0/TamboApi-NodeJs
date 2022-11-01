const { response } = require("express");
const sql = require("mssql");
const { saveUrlImage } = require("../helpers/functions");
const productoCtr = {}

productoCtr.getProducts = (req,res) => {
    const request = new sql.Request();
    request.query("SELECT * FROM PRODUCTOS")
        .then(rs => {
            res.status(200).json(rs.recordsets);
        })
}

productoCtr.productById = (req,res) => {
    const {IdProduct} = req.params
    const request = new sql.Request()
    request
    .input("idProduct", sql.Int, IdProduct)
    .query("SELECT * FROM PRODUCTOS WHERE IdProducto = @idProduct")
    .then(
        response => {
            res.status(200).json(response.recordsets[0])
        }
    )
    .catch(
        err => {
            res.status(500).json({err})
        }
    )
}

productoCtr.productByName = (req,res) => {
    const {NameProduct} = req.params
    const request = new sql.Request()
    request
    .input("productName", sql.VarChar, NameProduct)
    .query("SELECT * FROM PRODUCTOS WHERE NombreProducto LIKE '%'+@productName+'%'")
    .then(
        response => {
            res.status(200).json(response.recordsets[0])
        }
    )
    .catch(
        err => {
            res.status(500).json({err})
        }
    )
}

productoCtr.addProduct = (req,res) => {
    const { filename } = req.file;
    const { NombreProducto,Precio,Stock,Fecha_Entrada,Estado,IdCategoria } = req.body;
    const url = (req.file) ? saveUrlImage(filename): '';
    const request = new sql.Request();
    request
    .input("NombreProducto", sql.VarChar, NombreProducto)
    .input("Precio", sql.Money, Precio)
    .input("Stock", sql.Int, Stock)
    .input("Fecha_Entrada", sql.Date, Fecha_Entrada)
    .input("Estado", sql.VarChar, Estado)
    .input("IdCategoria", sql.Int, IdCategoria)
    .input("ImgUrl", sql.VarChar, url)
    .query(`INSERT INTO PRODUCTOS VALUES(@NombreProducto,@Precio,@Stock,@Fecha_Entrada,@Estado,@IdCategoria,@ImgUrl)`)
        .then(rs => {
            res.status(200).json({ "message": 'Rows Affected '+ rs.rowsAffected[0] });
        })
        .catch(err => {
            res.status(500).json({err: err})
        })
}

productoCtr.changeProductStatus = (req, res) =>{
    const {IdProduct} = req.params
    const request = new sql.Request();
    request
    .input("idProduct", sql.Int, IdProduct)
    .query("DELETE FROM PRODUCTOS WHERE IdProducto = @idProduct")
    .then(response => {
        res.status(200).json({response})
    })
    .catch(err => {
        res.status(500).json({err: err})
    })
}

productoCtr.updateProduct = (req,res) => {
    const {IdProduct} = req.params;
    const {NombreProducto, Precio, Stock, Fecha_Entrada, Estado, IdCategoria, ImagenProducto} = req.body

    const request = new sql.Request();

    request
    .input("idProduct",sql.Int, IdProduct)
    .input("nombreProducto", sql.VarChar, NombreProducto)
    .input("precio", sql.Money, Precio)
    .input("stock", sql.Int, Stock)
    .input("fecha_Entrada", sql.Date, Fecha_Entrada)
    .input("estado", sql.VarChar, Estado)
    .input("idCategoria", sql.Int, IdCategoria)
    .input("imagenProducto", sql.VarChar, ImagenProducto)
    .query("UPDATE PRODUCTOS SET NombreProducto = @nombreProducto, Precio = @precio, Stock = @stock, Fecha_Entrada = @fecha_Entrada, Estado = @estado, IdCategoria = @idCategoria, ImagenProducto = @imagenProducto WHERE IdProducto = @idProduct")
    .then(
        response => {
            res.status(200).json({response})
        }
    )
    .catch(
        err => {
            res.status(500).json({err})
        }
    )
} 

module.exports = productoCtr;