const sql = require("mssql");
const { queries } = require("../helpers/functions");
const { validationResult } = require("express-validator");

const categoriaCtr = {};

categoriaCtr.allCategorias = (req, res) => {
  const request = new sql.Request();
  request.query("SELECT * FROM CATEGORIAS", (err, rs) => {
    if (err) {
      return res.sendStatus(500).json({ message: `${err}` });
    }
    res.json(rs.recordset);
  });
};

categoriaCtr.categoriaById = (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    const { idCategoria } = req.params;
    const request = new sql.Request();
    request.query(
      `${queries[0].categoriaById} = ${idCategoria}`,
      (err, result) => {
        if (err) res.json(err);
        res.status(200).json(result.recordset[0]);
      }
    );
  }
};

categoriaCtr.addCategoria = (req, res) => {
  const { CategoriaName } = req.body;
  const request = new sql.Request();

  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.json({ error: error.errors[0].msg });
  } else {
    request
      .input("CategoriaName", sql.VarChar, CategoriaName)
      .query(queries[0].addCategoria)
      .then((rs) => {
        res
          .status(200)
          .json({ message: "Rows Affected " + rs.rowsAffected[0] });
      })
      .catch((err) => res.send(err));
  }
};

// WE'LL POBRABLY CHANGE THIS METHOD
categoriaCtr.deleteCategoria = (req, res) => {
  const { idCategoria } = req.params;
  const request = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .input("IdCategoria", sql.Int, idCategoria)
      .query(`DELETE FROM CATEGORIAS WHERE IdCategoria = @IdCategoria`)
      .then((rs) => {
        res.status(200).json(rs);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

categoriaCtr.updateCategoria = (req, res) => {
  const { idCategoria } = req.params;
  const { CategoriaName } = req.body;
  const request = new sql.Request();

  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .input("IdCategoria", sql.Int, idCategoria)
      .input("CategoriaName", sql.VarChar, CategoriaName)
      .query(queries[0].updateCategoria)
      .then((rs) => {
        res.status(200).json(rs);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

categoriaCtr.searchByName = (req, res) => {
  const { data } = req.params;
  const request = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .query(`${queries[0].categoriaByName} '%${data}%'`)
      .then((rs) => {
        res.status(200).json(rs.recordsets[0]);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

module.exports = categoriaCtr;
