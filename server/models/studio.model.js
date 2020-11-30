import dbConn from "../config/dbConfig.config.js";
import { StatusCodes } from "http-status-codes";
import mysql from "mysql";

const STUDIO_TABLE = "estudio_grabacion";

const Studio = () => { };

Studio.addStudioInfo = (newStudio, result) => {
    dbConn.query(`INSERT INTO ${STUDIO_TABLE} SET ?`, [newStudio], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Studio.getAllStudios = (result) => {
    dbConn.query(`SELECT * FROM ${STUDIO_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            studios: res,
            total: res.length
        });
    });
}

Studio.searchStudios = ({ id = "", name = "" }, result) => {
    const queryStr = `SELECT * FROM ${STUDIO_TABLE} WHERE id = ${mysql.escape(id)} OR name = ${mysql.escape(name)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            studios: res,
            total: res.length
        });
    });
}

Studio.updateStudio = ({ id, name, address, webpage, phone }, result) => {
    dbConn.query(`UPDATE ${STUDIO_TABLE} SET name = ?, address = ?, webpage = ?, phone = ? WHERE id = ?`,
        [mysql.escape(name), mysql.escape(address), mysql.escape(webpage), mysql.escape(phone), mysql.escape(id)], (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente el estudio de grabacion" });
        });
}

Studio.deleteStudio = (id, result) => {
    dbConn.query(`DELETE FROM ${STUDIO_TABLE} WHERE id = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente el estudio de grabacion" });
    })
}

export default Studio;