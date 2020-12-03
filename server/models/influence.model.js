import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const INF_TABLE = "influencia";
const COL_ID = "id";
const COL_IDART = "id_artista";
const COL_IDMUSC = "id_musico";

const Influence = () => { };

Influence.add = (newInf, result) => {
    dbConn.query(`INSERT INTO ${INF_TABLE} SET ?`, [newInf], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Influence.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${INF_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            influences: res,
            total: res.length
        });
    });
}

Influence.search = ({ id = "", idArt = "", idMusc = "" }, result) => {
    const queryStr = `SELECT * FROM ${INF_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_IDART} = ${mysql.escape(idArt)} OR ${COL_IDMUSC} = ${mysql.escape(idMusc)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            influences: res,
            total: res.length
        });
    });
}

Influence.update = ({ id, idArt, idMusc }, result) => {
    dbConn.query(`UPDATE ${INF_TABLE} SET ${COL_IDART} = ?, ${COL_IDMUSC} = ? WHERE ${COL_ID} = ?`,
        [
            mysql.escape(idArt),
            mysql.escape(idMusc),
            mysql.escape(id),
        ],
        (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente la influencia musical" });
        });
}

Influence.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${INF_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente la influencia musical" });
    });
}

export default Influence;