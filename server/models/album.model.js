import dbConn from "../config/dbConfig.config.js";
import mysql from "mysql";

const ALBUM_TABLE = "album";
const COL_ID = "id";
const COL_NOMBRE = "nombre";
const COL_FECHA = "fecha";
const COL_NUMCANC = "num_canciones";
const COL_PORTADA = "img_portada";
const COL_CPORTADA = "img_contraportada";
const COL_IDESTUDIO = "id_estudio";
const COL_IDARTISTA = "id_estudio";

const Album = () => { };

Album.add = (newAlbum, result) => {
    dbConn.query(`INSERT INTO ${ALBUM_TABLE} SET ?`, [newAlbum], (err, res) => {
        if (err) return result({ error: err }, null);
        return result(null, res);
    });
}

Album.getAll = (result) => {
    dbConn.query(`SELECT * FROM ${ALBUM_TABLE}`, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            albums: res,
            total: res.length
        });
    });
}

//Implementar query y vista de informacion de estudio y artista (id)
Album.search = ({ id = "", name = "" }, result) => {
    const queryStr = `SELECT * FROM ${ALBUM_TABLE} WHERE ${COL_ID} = ${mysql.escape(id)} OR ${COL_NOMBRE} = ${mysql.escape(name)}`;
    dbConn.query(queryStr, (error, res) => {
        if (error) return result({ error: error }, null);
        return result(null, {
            albums: res,
            total: res.length
        });
    });
}

Album.update = ({ id, name, fecha, noCanc, portada, cportada, idEst, idArt }, result) => {
    dbConn.query(`UPDATE ${ALBUM_TABLE} SET ${COL_NOMBRE} = ?, ${COL_FECHA} = ?, ${COL_NUMCANC} = ?, ${COL_PORTADA} = ?, ${COL_CPORTADA} = ?, ${COL_IDESTUDIO} = ?, ${COL_IDARTISTA} = ? WHERE ${COL_ID} = ?`,
        [
            mysql.escape(name),
            mysql.escape(fecha),
            mysql.escape(noCanc),
            mysql.escape(portada),
            mysql.escape(cportada),
            mysql.escape(idEst),
            mysql.escape(idArt),
            mysql.escape(id)
        ],
        (error, res) => {
            if (error) return result({ error: error }, null);
            return result(null, { message: "Se ha actualizado correctamente el album" });
        });
}

Album.delete = (id, result) => {
    dbConn.query(`DELETE FROM ${ALBUM_TABLE} WHERE ${COL_ID} = ?`, [mysql.escape(id)], (error, response) => {
        if (error) return result({ error: error }, null);
        return result(null, { message: "Se ha eliminado correctamente al album" });
    });
}

export default Album;