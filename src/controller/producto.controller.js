const sql = require("mssql");
const { saveUrlImage, queries } = require("../helpers/functions");
const { s3, getParams } = require("../libs/aws.config");
const { validationResult } = require("express-validator");
const productoCtr = {};

productoCtr.getProducts = (req, res) => {
  const request = new sql.Request();
  request
    .query("SELECT * FROM PRODUCTOS")
    .then((rs) => {
      res.status(200).json(rs.recordsets[0]);
    });
};

productoCtr.productById = async (req, res) => {
  const { IdProduct } = req.params;
  const request = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .input("idProduct", sql.Int, IdProduct)
      .query(queries[0].productoById)
      .then((response) => {
        if (response.recordsets[0].length != 0)
          res.status(200).json(response.recordsets[0]);
        else res.status(200).json({ message: "No hay datos para mostrar" });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
};

productoCtr.productByName = (req, res) => {
  const { NameProduct } = req.params;
  const request = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .input("productName", sql.VarChar, NameProduct)
      .query(queries[0].productoByName)
      .then((response) => {
        res.status(200).json(response.recordsets[0]);
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
};

productoCtr.addProduct = (req, res) => {
  const { NombreProducto, Descripcion, IdCategoria } =
    req.body;
  //const url = (req.file) ? saveUrlImage(filename): null;
  const params = getParams(req);

  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    s3.upload(params, (err, data) => {
      if (err) return res.status(500).json({ err: err });
      const url = data.Location;
      const request = new sql.Request();
      request
        .input("NombreProducto", sql.VarChar, NombreProducto)
        .input("Descripcion", sql.VarChar, Descripcion)
        .input("IdCategoria", sql.Int, IdCategoria)
        .input("ImgUrl", sql.VarChar, url)
        .query(queries[0].addProduct)
        .then((rs) => {
          res
            .status(200)
            .json({ message: "Rows Affected " + rs.rowsAffected[0] });
        })
        .catch((err) => {
          res.status(500).json({ err: err });
        });
    });
  }
};
/*
productoCtr.changeProductStatus = async(req, res) => {
  const { IdProduct } = req.params;
  const request = new sql.Request();
  const changeP = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    let estadoP = undefined;
    const resP = await changeP.input("idProduct", sql.Int, IdProduct)
    .query(queries[0].productoById)

    if(resP.recordsets[0][0].Estado == "NO DISPONIBLE"){
      estadoP = "DISPONIBLE";
    } else {
      estadoP = "NO DISPONIBLE";
    }

    request
      .input("idProduct", sql.Int, IdProduct)
      .input("Estado", sql.VarChar, estadoP)
      .query(queries[0].changeState)
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((err) => {
        res.status(500).json({ err: err });
      });
  }
};
*/
productoCtr.updateProduct = (req, res) => {
  const { IdProduct } = req.params;
  const { NombreProducto, Descripcion, IdCategoria } =
    req.body;
  const request = new sql.Request();
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    request
      .input("idProduct", sql.Int, IdProduct)
      .input("nombreProducto", sql.VarChar, NombreProducto)
      .input("Descripcion", sql.VarChar, Descripcion)
      .input("idCategoria", sql.Int, IdCategoria)
      .query(queries[0].updateProduct)
      .then((response) => {
        res.status(200).json({ response });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
};

productoCtr.updateProductImage = (req, res) => {
  const { IdProduct } = req.params;
  //const url = (req.file) ? saveUrlImage(req.file.filename) : null;
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(500).json({ error: error.errors[0].msg });
  } else {
    const params = getParams(req);
    s3.upload(params, (err, data) => {
      if (err) return res.status(500).json({ err: err });
      const url = data.Location;
      const request = new sql.Request();
      request
        .input("imagenProducto", sql.VarChar, url)
        .query(`${queries[0].updateProductImage} = ${IdProduct}`)
        .then((response) => {
          res.status(200).json({ response });
        })
        .catch((err) => {
          res.status(500).json({ err });
        });
    });
  }
};

module.exports = productoCtr;
