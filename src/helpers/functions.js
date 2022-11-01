const functions = {}

functions.saveUrlImage = function(filename){
    return `http://localhost:3000/public/${filename}`
}

module.exports = functions;