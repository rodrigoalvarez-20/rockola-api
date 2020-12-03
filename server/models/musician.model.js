import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const MUSICIAN_TABLE = "musico";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_INSTRUMENTO = "instrumento";
const COL_CDNAC = "cd_nacimiento";
const COL_IDGRUPO = "id_grupo";

const Musician = () => { };

Musician.add = (newMusician, result) => {
    dbConn.query(`INSERT INTO ${MUSICIAN_TABLE} SET ?`, [newMusician], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Musician.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${MUSICIAN_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            musicians: res,
            total: res.length
        });
    });
}

Musician.search = ({ id = "", name = "" }, result) => {
    const queryStr = `SELECT * FROM ${MUSICIAN_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_NOMBRE} = ${mysql.escape(name)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            musicians: res,
            total: res.length
        });
    });
}

Musician.update = ({ id, name, instr, cdNac, idGroup }, result) => {
    dbConn.query(`UPDATE ${ALBUM_TABLE} SET ${COL_NOMBRE} = ?, ${COL_INSTRUMENTO} = ?, ${COL_CDNAC} = ?, ${COL_IDGRUPO} = ? WHERE ${COL_ID} = ?`,
        [
            mysql.escape(name),
            mysql.escape(instr),
            mysql.escape(cdNac),
            mysql.escape(idGroup),
            mysql.escape(id),
        ],
        (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente la informacion del musico" });
        });
}

Musician.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${MUSICIAN_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente el musico" });
    });
}

export default Musician;