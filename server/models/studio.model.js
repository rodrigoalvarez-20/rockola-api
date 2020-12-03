import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const STUDIO_TABLE = "estudio_grabacion";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_DIRECCION = "direccion";
const COL_SITIOWEB = "sitio_web";
const COL_TELEFONO = "telefono";

const Studio = () => { };

Studio.add = (newStudio, result) => {
    dbConn.query(`INSERT INTO ${STUDIO_TABLE} SET ?`, [newStudio], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Studio.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${STUDIO_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            studios: res,
            total: res.length
        });
    });
}

Studio.search = ({ id = "", name = "" }, result) => {
    const queryStr = `SELECT * FROM ${STUDIO_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_NOMBRE} = ${mysql.escape(name)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            studios: res,
            total: res.length
        });
    });
}

Studio.update = ({ id, name, address, webpage, phone }, result) => {
    dbConn.query(`UPDATE ${STUDIO_TABLE} SET ${COL_NOMBRE} = ?, ${COL_DIRECCION} = ?, ${COL_SITIOWEB} = ?, ${COL_TELEFONO} = ? WHERE ${COL_ID} = ?`,
        [mysql.escape(name), mysql.escape(address), mysql.escape(webpage), mysql.escape(phone), mysql.escape(id)], (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente el estudio de grabacion" });
        });
}

Studio.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${STUDIO_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente el estudio de grabacion" });
    });
}

export default Studio;