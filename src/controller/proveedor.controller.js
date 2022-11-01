const sql = require("mssql");

const proveedorCtr = {};

proveedorCtr.getProveedores = (req,res) => {
    const request = new sql.Request()
    request
    .query("SELECT * FROM PROVEEDORES").then(rs => {
        res.status(200).json(rs.recordsets)
    })
    .catch(
        err => {
            res.status(200).json({err})
        }
    )
}

proveedorCtr.proveedorById = (req ,res) => {
    const { idProveedor } = req.params
    const request = new sql.Request()
    request
    .input("idProveedor", sql.Int, idProveedor)
    .query("SELECT * FROM PROVEEDORES WHERE IdProveedor = @idProveedor")
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

proveedorCtr.proveedorByName = (req,res) => {
    const { proveedorName } = req.params
    const request = new sql.Request()
    request
    .input("proveedorName", sql.VarChar, proveedorName)
    .query("SELECT * FROM PROVEEDORES WHERE NombreProveedor LIKE '%'+@proveedorName+'%'")
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

proveedorCtr.addProveedor = (req,res) => {

}

proveedorCtr.deleteProveedor = (req,res) => {

}

proveedorCtr.updateProveedor = (req,res) => {

}

module.exports = proveedorCtr;