const sql = require("mssql");

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
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
