const { validationResult } = require("express-validator");
const sql = require("mssql");
const { queries } = require("../helpers/functions");

detPedPro = {};

detPedPro.getDetPedPro = async (req, res) => {
  const request = new sql.Request();

  try {
    const rs = await request.query("SELECT * FROM DT_PEDIDO_PRODUCTOS");
    res.status(200).json(rs.recordsets[0]);
  } catch (error) {
    console.error(error);
    res.json(error)
  }
};

detPedPro.detPedProById = async (req, res) => {
    const request = new sql.Request();
    const { idDetPedPro } = req.params;

    const error = validationResult(req)

    if (!error.isEmpty()){
        res.status(500).json({"error": error.errors[0].msg})
    } else {
        try {
            const rs = await request
            .input("IdDetPedPro", sql.Int, idDetPedPro)
            .query(queries[0].detPedProById)

            res.status(200).json(rs.recordsets[0])
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
};

detPedPro.addDetPedPro = async (req, res) => {
    const request = new sql.Request();
    const {IdPedido, IdProducto, CantidadPedido, montoPedido, Fecha_Produccion, Fecha_Vencimiento} = req.body;

    const error = validationResult(req)

    if (!error.isEmpty()){
        res.status(500).json({"error": error.errors[0].msg})
    } else {
        try {
            const rs = await request
            .input("IdPedido", sql.Int, IdPedido)
            .input("IdProducto", sql.Int, IdProducto)
            .input("CantidadPedido", sql.Int, CantidadPedido)
            .input("montoPedido", sql.Money, montoPedido)
            .input("Fecha_Produccion", sql.Date, Fecha_Produccion)
            .input("Fecha_Vencimiento", sql.Date, Fecha_Vencimiento)
            .query(queries[0].addDetPedPro)

            res.status(200).json(rs)
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
};

detPedPro.updateDetPedPro = async (req, res) => {
    const request = new sql.Request();
    const {idDetPedPro} = req.params;
    const {IdPedido, IdProducto, CantidadPedido, montoPedido, Fecha_Produccion, Fecha_Vencimiento, IdFactura} = req.body;

    const error = validationResult(req)

    if (!error.isEmpty()){
        res.status(500).json({"error": error.errors[0].msg})
    } else {
        try {
            const rs = await request
            .input("IdDetPedPro", sql.Int, idDetPedPro)
            .input("IdPedido", sql.Int, IdPedido)
            .input("IdProducto", sql.Int, IdProducto)
            .input("CantidadPedido", sql.Int, CantidadPedido)
            .input("montoPedido", sql.Money, montoPedido)
            .input("Fecha_Produccion", sql.Date, Fecha_Produccion)
            .input("Fecha_Vencimiento", sql.Date, Fecha_Vencimiento)
            .input("IdFactura", sql.Int, IdFactura)
            .query("UPDATE DT_PEDIDO_PRODUCTOS SET IdPedido = @IdPedido, IdProducto = @IdProducto, CantidadPedido = @CantidadPedido, montoPedido = @montoPedido, Fecha_Produccion = @Fecha_Produccion, Fecha_Vencimiento = @Fecha_Vencimiento, IdFactura = @IdFactura WHERE Id = @IdDetPedPro")

            res.status(200).json(rs)
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    
};

module.exports = detPedPro;
