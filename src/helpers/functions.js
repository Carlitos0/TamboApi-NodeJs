const functions = {}

functions.saveUrlImage = function(filename){
    return `http://localhost:3000/public/${filename}`
}

functions.queries = [
    {
        updateProduct: "UPDATE PRODUCTOS SET NombreProducto = @nombreProducto, Precio = @precio, Stock = @stock, Fecha_Entrada = @fecha_Entrada, Estado = @estado, IdCategoria = @idCategoria WHERE IdProducto = @idProduct",
        updateProductImage: "UPDATE PRODUCTOS SET ImagenProducto = @imagenProducto WHERE IdProducto",
        changeState: "UPDATE PRODUCTOS SET Estado = 'NO DISPONIBLE' WHERE IdProducto = @idProduct",
        addProduct: `INSERT INTO PRODUCTOS VALUES(@NombreProducto,@Precio,@Stock,@Fecha_Entrada,@Estado,@IdCategoria,@ImgUrl)`,
        productoByName: "SELECT * FROM PRODUCTOS WHERE NombreProducto LIKE '%'+@productName+'%'",
        productoById: "SELECT * FROM PRODUCTOS WHERE IdProducto = @idProduct",
        updateProveedor : "UPDATE PROVEEDORES SET NombreProveedor = @NombreProveedor, Direccion= @Direccion, Telefono = @Telefono,Email = @Email, Estado = @Estado WHERE IdProveedor = @idProveedor",
        deleteProveedor: "UPDATE PROVEEDORES SET Estado = 'INACTIVO' WHERE IdProveedor",
        activarEstadoProvider: "UPDATE PROVEEDORES SET Estado = 'ACTIVO' WHERE IdProveedor",
        addProveedor: "INSERT INTO PROVEEDORES VALUES(@NombreProveedor,@Direccion,@Telefono,@Email,@Estado)",
        searchProveedor: "SELECT * FROM PROVEEDORES WHERE NombreProveedor LIKE '%'+@proveedorName+'%'",
        proveedorById: "SELECT * FROM PROVEEDORES WHERE IdProveedor = @idProveedor",
        categoriaById: "SELECT * FROM CATEGORIAS WHERE IdCategoria",
        addCategoria: "INSERT INTO CATEGORIAS (CategoriaName) VALUES(@CategoriaName)",
        updateCategoria: "UPDATE CATEGORIAS SET CategoriaName = @CategoriaName WHERE IdCategoria = @IdCategoria",
        categoriaByName: "SELECT * FROM CATEGORIAS WHERE CategoriaName LIKE",
    }
]

module.exports = functions;