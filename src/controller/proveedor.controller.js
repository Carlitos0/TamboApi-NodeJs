const sql = require("mssql");

const proveedorCtr = {};

proveedorCtr.getProveedores = (req,res) => {
    const request = new sql.Request()
    request
    .query("SELECT * FROM PROVEEDORES").then(rs => {
        res.status(200).json(rs.recordsets)
    })
}

module.exports = proveedorCtr;