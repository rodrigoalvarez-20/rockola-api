import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const GROUP_TABLE = "grupo";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_IDARTISTA = "id_artista";

const Group = () => { };

Group.add = (newGroup, result) => {
    dbConn.query(`INSERT INTO ${GROUP_TABLE} SET ?`, [newGroup], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Group.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${GROUP_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            groups: res,
            total: res.length
        });
    });
}

Group.search = ({ id = "", name = "" }, result) => {
    const queryStr = `SELECT * FROM ${GROUP_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_NOMBRE} = ${mysql.escape(name)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            groups: res,
            total: res.length
        });
    });
}

Group.update = ({ id, name, idArt }, result) => {
    dbConn.query(`UPDATE ${ALBUM_TABLE} SET ${COL_NOMBRE} = ?, ${COL_IDARTISTA} = ? WHERE ${COL_ID} = ?`,
        [
            mysql.escape(name),
            mysql.escape(idArt),
            mysql.escape(id),
        ],
        (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente el grupo" });
        });
}

Group.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${GROUP_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente el grupo" });
    });
}

export default Group;