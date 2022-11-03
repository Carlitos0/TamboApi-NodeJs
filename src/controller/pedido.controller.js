const sql = require("mssql");
const { queries } = require("../helpers/functions");

pedidoCtr = {};

pedidoCtr.getPedidos = (req, res) => {
  const request = new sql.Request();

  request
    .query("SELECT * FROM PEDIDOS")
    .then((rs) => {
      res.status(200).json(rs.recordsets[0]);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

pedidoCtr.pedidoById = async (req, res) => {
  const { idPedido } = req.params;
  const request = new sql.Request();

  try {
    const rs = await request
      .input("idPedido", sql.Int, idPedido)
      .query(queries[0].pedidoById);

    res.status(200).json(rs.recordsets[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

pedidoCtr.addPedido = async (req, res) => {
  const { CantidadPedido, FechaPedido, FechaEntrega, IdProveedor, IdFactura } =
    req.body;
  const request = new sql.Request();

  try {
    const rs = await request
      .input("CantidadPedido", sql.Int, CantidadPedido)
      .input("FechaPedido", sql.Date, FechaPedido)
      .input("FechaEntrega", sql.Date, FechaEntrega)
      .input("IdProveedor", sql.Int, IdProveedor)
      .input("IdFactura", sql.Int, IdFactura)
      .query(queries[0].addPedido);

    res.status(200).json(rs);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

pedidoCtr.updatePedido = async (req, res) => {
  const { idPedido } = req.params;
  const { CantidadPedido, FechaPedido, FechaEntrega, IdProveedor, IdFactura } =
    req.body;
  const request = new sql.Request();

  try {
    const rs = await request
      .input("IdPedido", sql.Int, idPedido)
      .input("CantidadPedido", sql.Int, CantidadPedido)
      .input("FechaPedido", sql.Date, FechaPedido)
      .input("FechaEntrega", sql.Date, FechaEntrega)
      .input("IdProveedor", sql.Int, IdProveedor)
      .input("IdFactura", sql.Int, IdFactura)
      .query(queries[0].updatePedido)
    res.status(200).json(rs);
  } catch (error) {
    console.error(error);
    res.status(500).json({error});
  }
};

module.exports = pedidoCtr;
