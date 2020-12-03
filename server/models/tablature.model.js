import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const TB_TABLE = "tablatura";
const COL_ID = "id";
const COL_URL = "url";
const COL_FECHA = "fecha";
const COL_NomTrad = "nombre_traductor";
const COL_CorreoTrad = "correo_traductor";
const COL_IDCANC = "id_cancion";

const Tablature = () => { };

Tablature.add = (newTb, result) => {
    dbConn.query(`INSERT INTO ${TB_TABLE} SET ?`, [newTb], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Tablature.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${TB_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            tablatures: res,
            total: res.length
        });
    });
}

Tablature.search = ({ id = "", idCanc = "" }, result) => {
    const queryStr = `SELECT * FROM ${TB_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_IDCANC} = ${mysql.escape(idCanc)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            tablatures: res,
            total: res.length
        });
    });
}

Tablature.update = ({ id, url, date, NTrad, CTrad, idCanc }, result) => {
    dbConn.query(`UPDATE ${TB_TABLE} SET ${COL_URL} = ?, ${COL_FECHA} = ?, ${COL_NomTrad} = ?, ${COL_CorreoTrad} = ?, ${COL_IDCANC} = ?  WHERE ${COL_ID} = ?`,
        [
            mysql.escape(name),
            mysql.escape(url),
            mysql.escape(date),
            mysql.escape(NTrad),
            mysql.escape(CTrad),
            mysql.escape(idCanc),
            mysql.escape(id),
        ],
        (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente la tablatura" });
        });
}

Tablature.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${TB_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente la tablatura" });
    });
}

export default Tablature;