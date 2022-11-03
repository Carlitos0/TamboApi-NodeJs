const sql = require("mssql");
const { queries } = require("../helpers/functions");

facturaCtr = {};

facturaCtr.getFactura = async (req, res) => {
  const request = new sql.Request();

  try {
    const rs = await request.query("SELECT * FROM FACTURAS");

    res.status(200).json(rs.recordsets[0]);
  } catch (error) {
    console.error(error);
    res.json({error})
  }
};

facturaCtr.facturaById = async(req, res) => {
    const {idFactura} = req.params;
    const request = new sql.Request();

    try {
        const rs = await request
        .input("IdFactura", sql.Int, idFactura)
        .query(queries[0].facturaById)

        res.status(200).json(rs.recordsets[0])
    } catch (error) {
        console.error(error);
        res.json(error)
    }
};

facturaCtr.addFactura = async (req, res) => {
    const request = new sql.Request();
    const {
        Subtotal,
        Igv,
        TotalFactura,
        FechaEmision
    } = req.body;

    try {
        const rs = await request
        .input("Subtotal", sql.Decimal, Subtotal)
        .input("Igv", sql.Decimal, Igv)
        .input("TotalFactura", sql.Decimal, TotalFactura)
        .input("FechaEmision", sql.Date, FechaEmision)
        .query(queries[0].addFactura)

        res.status(200).json(rs)
    } catch (error) {
        console.error(error);
        res.json({error})
    }
};

facturaCtr.updateFactura = async (req, res) => {
    const request = new sql.Request();
    const {idFactura} = req.params;
    const {
        Subtotal,
        Igv,
        TotalFactura,
        FechaEmision
    } = req.body;

    try {
        const rs = await request
        .input("IdFactura", sql.Int, idFactura)
        .input("Subtotal", sql.Decimal, Subtotal)
        .input("Igv", sql.Decimal, Igv)
        .input("TotalFactura", sql.Decimal, TotalFactura)
        .input("FechaEmision", sql.Date, FechaEmision)
        .query(queries[0].updateFactura)

        res.status(200).json(rs);
    } catch (error) {
        console.error(error);
        res.json({error})
    }
    
};

module.exports = facturaCtr;
