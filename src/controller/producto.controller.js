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



module.exports = productoCtr;