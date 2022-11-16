const sql = require("mssql");

const sqlConfig = {
    user: process.env.DB_USER || "CloudSAe0b806c8",
    password: process.env.DB_PWD || "BlueDemon978",
    database: process.env.DB_NAME || "BD_PRODUCTOTAMBO",
    server: process.env.DB_SERVER || 'dark2004.database.windows.net',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const conectar = async function (){
    try {
        await sql.connect(sqlConfig);
        console.log(`Connected to Db ${sqlConfig.database}`); 
    } catch (error) {
        console.log(error);
    }
}();

module.exports = { sql, sqlConfig };