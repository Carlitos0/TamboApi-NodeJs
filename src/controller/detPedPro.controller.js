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

    try {
        const rs = await request
        .input("IdDetPedPro", sql.Int, idDetPedPro)
        .query(queries[0].detPedProById)

        res.status(200).json(rs.recordsets[0])
    } catch (error) {
        console.error(error);
        res.json(error)
    }
};

detPedPro.addDetPedPro = async (req, res) => {
    const request = new sql.Request();
    const {IdPedido, IdProducto} = req.body;

    try {
        const rs = await request
        .input("IdPedido", sql.Int, IdPedido)
        .input("IdProducto", sql.Int, IdProducto)
        .query(queries[0].addDetPedPro)

        res.status(200).json(rs)
    } catch (error) {
        console.error(error);
        res.json(error)
    }
};

detPedPro.updateDetPedPro = async (req, res) => {
    const request = new sql.Request();
    const {idDetPedPro} = req.params;
    const {IdPedido, IdProducto} = req.body;

    try {
        const rs = await request
        .input("IdDetPedPro", sql.Int, idDetPedPro)
        .input("IdPedido", sql.Int, IdPedido)
        .input("IdProducto", sql.Int, IdProducto)
        .query("UPDATE DT_PEDIDO_PRODUCTOS SET IdPedido = @IdPedido, IdProducto = @IdProducto WHERE Id = @IdDetPedPro")

        res.status(200).json(rs)
    } catch (error) {
        console.error(error);
        res.json(error)
    }
    
};

module.exports = detPedPro;
