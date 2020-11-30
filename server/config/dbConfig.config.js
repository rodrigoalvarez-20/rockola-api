import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const dbConn = mysql.createConnection({
    host: process.env.MYSQL_SERVER,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB
});

dbConn.connect((error) => {
    if(error) throw error;
    console.info("Se ha conectado a la base de datos");
});

export default dbConn;
