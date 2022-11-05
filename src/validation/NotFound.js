const error404 = (req,res,next) => {
    res.status(404).json({"error": "La petición realizada no tiene contenido"})
}

module.exports = error404;