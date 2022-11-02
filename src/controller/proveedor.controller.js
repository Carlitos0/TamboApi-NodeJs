const sql = require("mssql");
const { queries } = require("../helpers/functions");

const proveedorCtr = {};

proveedorCtr.getProveedores = (req,res) => {
    const request = new sql.Request()
    request
    .query("SELECT * FROM PROVEEDORES").then(rs => {
        res.status(200).json(rs.recordsets[0])
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
    .query(queries[0].proveedorById)
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
    .query(queries[0].searchProveedor)
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
    const { NombreProveedor, Direccion, Telefono, Email, Estado } = req.body;
    const request = new sql.Request();
    request
    .input("NombreProveedor", sql.VarChar, NombreProveedor)
    .input("Direccion", sql.VarChar, Direccion)
    .input("Telefono", sql.VarChar, Telefono)
    .input("Email", sql.VarChar, Email)
    .input("Estado", sql.VarChar, Estado)
    .query(queries[0].addProveedor)
    .then(rs => {
        res.status(200).json({
            message: "Se añadió correctamente",
            data: rs.rowsAffected
        })
    })
    .catch(err => {
        return res.status(500).json({ err: err })
    })
}

proveedorCtr.activeStateProveedor = async (req,res) => {
    const { idProveedor }  = req.params;
    const request = new sql.Request();
    request.query(`${queries[0].activarEstadoProvider} = ${idProveedor}`)
        .then(rs => {
            res.status(200).json(rs)
        })
        .catch(err => {
            return res.status(500).json({ err: err })
        })
}

proveedorCtr.deleteProveedor = (req,res) => {
    const { idProveedor }  = req.params;
    const request = new sql.Request();
    request.query(`${queries[0].deleteProveedor} = ${idProveedor}`)
        .then(rs => {
            res.status(200).json(rs)
        })
        .catch(err => {
            return res.status(500).json({ err: err })
        })
}

proveedorCtr.updateProveedor = (req,res) => {
    const { NombreProveedor, Direccion, Telefono, Email, Estado } = req.body;
    const { idProveedor }  = req.params;
    const request = new sql.Request();
    request
    .input("idProveedor", sql.Int, idProveedor)
    .input("NombreProveedor", sql.VarChar, NombreProveedor)
    .input("Direccion", sql.VarChar, Direccion)
    .input("Telefono", sql.Int, Telefono)
    .input("Email", sql.VarChar, Email)
    .input("Estado", sql.VarChar, Estado)
    .query(queries[0].updateProveedor)
        .then(rs => {
            res.status(200).json(rs)
        })
        .catch(err => {
            return res.status(500).json({ err: err })
        })
}

module.exports = proveedorCtr;