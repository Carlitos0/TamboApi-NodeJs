const sql = require("mssql");

const categoriaCtr = {};

categoriaCtr.allCategorias = (req,res) => {
    const request = new sql.Request();
    request.query("SELECT * FROM CATEGORIAS", (err,rs) => {
        if(err){
            return res.sendStatus(500).json({ "message":`${err}` });
        }
        res.json(rs.recordset);
    });
};

categoriaCtr.categoriaById =  (req, res) => {
    const { idCategoria } = req.params;
    const request = new sql.Request();
    request.query(`SELECT * FROM CATEGORIAS WHERE IdCategoria = ${idCategoria}`, async (err,result) => {
        if(err) res.json(err);
        res.status(200).json(result.recordset[0]);
    });
}

categoriaCtr.addCategoria = (req ,res) => {
    const { CategoriaName } = req.body;
    const request = new sql.Request();
    request
    .input("CategoriaName",sql.VarChar,CategoriaName)
    .query(`INSERT INTO CATEGORIAS (CategoriaName) VALUES(@CategoriaName)`)
        .then(rs => {
            res.status(200).json({ "message": 'Rows Affected '+ rs.rowsAffected[0] });
        })
        .catch(err => res.send(err));

}

categoriaCtr.deleteCategoria = (req,res) => {
    const { idCategoria } = req.params;
    const request = new sql.Request();
    request
    .input("IdCategoria", sql.Int, idCategoria)
    .query(`DELETE FROM CATEGORIAS WHERE IdCategoria = @IdCategoria`)
        .then(rs => {
            res.status(200).json(rs);
        })
        .catch(err => {
            res.send(err)
        })
}

categoriaCtr.updateCategoria = (req,res) => {
    const { idCategoria } = req.params;
    const { CategoriaName } = req.body;
    const request = new sql.Request();
    request
    .input("IdCategoria", sql.Int, idCategoria)
    .input("CategoriaName", sql.VarChar, CategoriaName)
    .query(`UPDATE CATEGORIAS SET CategoriaName = @CategoriaName WHERE IdCategoria = @IdCategoria`)
        .then(rs => {
            res.status(200).json(rs);
        })
        .catch(err => {
            res.send(err)
        })
}

categoriaCtr.searchByName = (req,res) => {
    const { data }  = req.params;
    const request = new sql.Request();
    request
    .query(`SELECT * FROM CATEGORIAS WHERE CategoriaName LIKE '%${data}%'`)
        .then(rs => {
            res.status(200).json(rs.recordsets[0]);
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports = categoriaCtr;